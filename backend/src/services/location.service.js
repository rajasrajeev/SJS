const { prisma } = require("../utils/prisma");


const createCountry = async (countriesPayload) => {
    const uniqueCountries = [
        ...new Map(
            countriesPayload.map(country => [country.name.toLowerCase(), country])
        ).values()
    ];
    
    const countryNames = uniqueCountries.map((country) => country.name);

    const existingCountries = await prisma.country.findMany({
        where: {
            name: { in: countryNames, mode: 'insensitive' },
        },
    });

    const existingNames = existingCountries.map((country) => country.name.toLowerCase());

    const newCountries = uniqueCountries.filter(
        (country) => !existingNames.includes(country.name)
    );

    const skippedCountries = uniqueCountries.filter((country) =>
        existingNames.includes(country.name.toLowerCase())
    );

    if (newCountries.length === 0) {
        throw ({
            status: 400,
            message: "All provided countries already exist."
        });
    }

    try {
        const createdCountries = await prisma.country.createMany({
            data: newCountries,
            skipDuplicates: true,
        });

        const new_list = await getCountries();
        return {
            created: createdCountries.count,
            skipped: skippedCountries.map((country) => country.name),
            data: new_list
        };
    } catch(err) {
        console.log(err);
        throw ({status: 400,message: "Cannot create Country!"});
    }
};


const getCountries = async(query) => {
    let search = query && query.search || '';

    console.log(search)
    const countries = await prisma.country.findMany({
        where: { name: { contains: search, mode: 'insensitive' },}
    });
    return countries;
}


const updateCountry = async(id, name, code) => {

    const isExists = await prisma.country.findFirst({
        where: { name: { equals: name, mode: 'insensitive' }, id: { not: parseInt(id) } }
    });

    if (isExists) throw ({ status: 400, message: "Country with same name already exists!"});

    const country = await prisma.country.update({
        where: { id: parseInt(id)},
        data: { name: name, code: code}
    })

    return country;
}


const deleteCountry = async(id) => {
    try {
        const country = await prisma.country.delete({
            where: { id: parseInt(id)}
        })
        return country;
    } catch (err) {
        console.log(err);
        throw ({ status: 400, message: "Cannot delete country"});
    }
}


const removeDuplicateState = async (data) => {
  const normalizedStates = data.states.map(state => state.toLowerCase());
  const uniqueStates = [...new Set(normalizedStates)];
  
  const finalStates = uniqueStates.map(state => {
      const originalState = data.states.find(s => s.toLowerCase() === state);
      return originalState;
  });

  data.states = finalStates;
  return data;
}


const createState = async (payload) => {
    const statePayload = await removeDuplicateState(payload);
    const { country_id, states } = statePayload;

    const existingStates = await prisma.state.findMany({
        where: {
            name: { in: states, mode: 'insensitive' },
            country_id: parseInt(country_id),
        },
    });

    const existingNames = existingStates.map((state) => state.name.toLowerCase());

    const newStates = states.filter(
        (state) => !existingNames.includes(state.toLowerCase())
    );

    const skippedStates = states.filter((state) =>
        existingNames.includes(state.toLowerCase())
    );

    if (newStates.length === 0)
        throw ({status: 400,message: "All provided states already exist."});
    
    try {
        const createdStates = await prisma.state.createMany({
            data: newStates.map((state) => ({
                name: state,
                country_id: parseInt(country_id),
            })),
            skipDuplicates: true, 
        });
        const new_list = await getStates(country_id);
        return {
            created: createdStates.count,
            skipped: skippedStates,
            data: new_list
        };
    } catch(err) {
        throw ({status: 400,message: "Cannot create State!"});
    }
};


const updateState = async (id, body) => {
    const isExists = await prisma.state.findFirst({
        where: { name: { equals: body.name, mode: 'insensitive' }, id: { not: parseInt(id) } }
    });

    if (isExists) throw ({ status: 400, message: "State with same name already exists!"});

    try {
        const state = await prisma.state.update({
            where: { id: parseInt(id) },
            data: { 
                name: body.name,
                country_id: body.country_id
            }
        });
        return state;
    } catch (err) {
        console.log(err);
        throw ({ status: 400, message: "Cannot update state"});
    }

}


const getStates = async(country_id, query) => {
    let search = query && query.search || '';

    const states = await prisma.state.findMany({
        where: { 
            country_id: parseInt(country_id),
            name: { contains: search, mode: 'insensitive' } 
        },
        include: { country: true }
    });
    return states;
}


const deleteState = async(id) => {
    try {
        const state = await prisma.state.delete({
            where: { id: parseInt(id)}
        })
    
        return state;
    } catch (err) {
        console.log(err);
        throw ({ status: 400, message: "Cannot delete state"});
    }
}


const removeDuplicateDistrict = async (data) => {
    const normalizedDistricts = data.districts.map(district => district.toLowerCase());
    const uniqueDistricts = [...new Set(normalizedDistricts)];
    
    const finalDistricts = uniqueDistricts.map(district => {
        const originalDistrict = data.districts.find(s => s.toLowerCase() === district);
        return originalDistrict;
    });
  
    data.districts = finalDistricts;
    return data;
}
  

const createDistrict = async (payload) => {
    const districtPayload = await removeDuplicateDistrict(payload);
    const { state_id, districts } = districtPayload;

    const existingDistricts = await prisma.district.findMany({
        where: {
            name: { in: districts, mode: 'insensitive' },
            state_id: parseInt(state_id),
        },
    });

    const existingNames = existingDistricts.map((district) => district.name.toLowerCase());

    const newDistricts = districts.filter(
        (district) => !existingNames.includes(district.toLowerCase())
    );

    const skippedDistricts = districts.filter((district) =>
        existingNames.includes(district.toLowerCase())
    );

    if (newDistricts.length === 0)
        throw ({status: 400,message: "All provided District already exist."});
    

    try {
        const createdDistricts = await prisma.district.createMany({
            data: newDistricts.map((district) => ({
                name: district,
                state_id: parseInt(state_id),
            })),
            skipDuplicates: true, 
        });
        const new_list = await getDistricts(state_id);

        return {
            created: createdDistricts.count,
            skipped: skippedDistricts,
            data: new_list
        };
    } catch(err) {
        console.log(err);
        throw ({status: 400,message: "Cannot create District!"});
    }
};


const getDistricts = async(state_id, query) => {
    let search = query && query.search || '';
    let mode = query && query.mode || "";

    if(mode === "all") {
        const districts = await prisma.district.findMany({
            where: {
                name: { contains: search, mode: 'insensitive' } 
            },
            include: { state: true }
        });
        return districts;
    }
    const districts = await prisma.district.findMany({
        where: { 
            state_id: parseInt(state_id),
            name: { contains: search, mode: 'insensitive' } 
        },
        include: { state: true }
    });
    return districts;
}


const updateDistrict = async (id, body) => {

    const isExists = await prisma.district.findFirst({
        where: { name: { equals: body.name, mode: 'insensitive' }, id: { not: parseInt(id) } }
    });

    if (isExists) throw ({ status: 400, message: "District with same name already exists!"});

    try {
        const district = await prisma.district.update({
            where: { id: parseInt(id) },
            data: { 
                name: body.name,
                state_id: body.state_id
            }
        });
        return district;
    } catch (err) {
        console.log(err);
        throw ({ status: 400, message: "Cannot update district"});
    }

}


const deleteDistrict = async(id) => {
    try {
        const district = await prisma.district.delete({
            where: { id: parseInt(id)}
        })
    
        return district;
    } catch (err) {
        console.log(err);
        throw ({ status: 400, message: "Cannot delete district"});
    }
}


module.exports = {
    createCountry,
    getCountries,
    updateCountry,
    deleteCountry,
    createState,
    getStates,
    updateState,
    deleteState,
    createDistrict,
    getDistricts,
    updateDistrict,
    deleteDistrict
}