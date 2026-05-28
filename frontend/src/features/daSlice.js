import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';


export const fetchShopDaMaster = createAsyncThunk(
  'da/fetchShopDaMaster',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/master/shop_da');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createShopDaMaster = createAsyncThunk(
  'da/createShopDaMaster',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/master/shop_da', payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateShopDaMaster = createAsyncThunk(
  'da/updateShopDaMaster',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/master/shop_da/${payload.id}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteShopDaMaster = createAsyncThunk(
  'da/deleteShopDaMaster',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/master/shop_da/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFabDaMaster = createAsyncThunk(
    'da/fetchFabDaMaster',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get('/master/fab_da');
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);
  
export const createFabDaMaster = createAsyncThunk(
  'da/createFabDaMaster',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/master/fab_da', payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
  
export const updateFabDaMaster = createAsyncThunk(
  'da/updateFabDaMaster',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/master/fab_da/${payload.id}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
  
  export const deleteFabDaMaster = createAsyncThunk(
    'da/deleteFabDaMaster',
    async (id, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.delete(`/master/fab_da/${id}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const fetchShopDa = createAsyncThunk(
    'da/fetchShopDa',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get('/da/shop');
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const createShopDa = createAsyncThunk(
    'da/createShopDa',
    async (payload, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post('/da/shop', payload);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const updateShopDa = createAsyncThunk(
    'da/updateShopDa',
    async (payload, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.put(`/da/shop/${payload.id}`, payload);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const deleteShopDa = createAsyncThunk(
    'da/deleteShopDa',
    async (id, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.delete(`/da/shop/${id}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );


  export const fetchFabDa = createAsyncThunk(
    'fabda/fetchFabDa',
    async (department_id, { rejectWithValue }) => {
      try {
        const query = { 'department_id': department_id };
        const response = await axiosInstance.get('/da/fab', { params: query });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  
  export const createFabDa = createAsyncThunk(
    'fabda/createFabDa',
    async (payload, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post('/da/fab', payload);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const updateFabDa = createAsyncThunk(
    'fabda/updateFabDa',
    async (payload, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.put(`/da/fab/${payload.id}`, payload);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const deleteFabDa = createAsyncThunk(
    'fabda/deleteFabDa',
    async (id, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.delete(`/da/fab/${id}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const fetchIDa = createAsyncThunk(
    'da/fetchIDa',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get('/da/ida');
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const createIDa = createAsyncThunk(
    'fabda/createIDa',
    async (payload, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post('/da/ida', payload);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const updateIDa = createAsyncThunk(
    'ida/updateIDa',
    async (payload, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.put(`/da/ida/${payload.id}`, payload);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const deletIDa = createAsyncThunk(
    'ida/deletIDa',
    async (id, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.delete(`/da/ida/${id}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

const daSlice = createSlice({
  name: 'da',
  initialState: {
    shopDaMaster: [],
    fabDaMaster: [],
    shopDas: [],
    fabDas: [],
    iDas: [],
    loading: false,
    error: null,
    daSuccess: false
  },
  reducers: {
    clearDa: (state) => {
      state.loading = false;
      state.error = null;
      state.daSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopDaMaster.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShopDaMaster.fulfilled, (state, action) => {
        state.loading = false;
        state.shopDaMaster = action.payload;
      })
      .addCase(fetchShopDaMaster.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot fetch data";
      })
      .addCase(createShopDaMaster.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.daSuccess = false;
      })
      .addCase(createShopDaMaster.fulfilled, (state, action) => {
        state.loading = false;
        state.shopDaMaster.push(action.payload)
        state.daSuccess = true;
      })
      .addCase(createShopDaMaster.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot create";
      })
      .addCase(updateShopDaMaster.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.daSuccess = false;
      })
      .addCase(updateShopDaMaster.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.shopDaMaster.findIndex(
          (daPoint) => daPoint.id === action.payload.id
        );
        if (index !== -1) {
          state.shopDaMaster[index] = action.payload;
        }
        state.daSuccess = true;
      })
      .addCase(updateShopDaMaster.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot update";
      })
      .addCase(deleteShopDaMaster.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteShopDaMaster.fulfilled, (state, action) => {
        state.loading = false;
        state.shopDaMaster = state.shopDaMaster.filter(
          (daPoint) => daPoint.id !== parseInt(action.payload.id)
        );
      })
      .addCase(deleteShopDaMaster.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot delete";
      })

      .addCase(fetchFabDaMaster.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFabDaMaster.fulfilled, (state, action) => {
        state.loading = false;
        state.fabDaMaster = action.payload;
      })
      .addCase(fetchFabDaMaster.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot fetch data";
      })
      .addCase(createFabDaMaster.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.daSuccess = false;
      })
      .addCase(createFabDaMaster.fulfilled, (state, action) => {
        state.loading = false;
        state.fabDaMaster.push(action.payload)
        state.daSuccess = true;
      })
      .addCase(createFabDaMaster.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot create";
      })
      .addCase(updateFabDaMaster.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.daSuccess = false;
      })
      .addCase(updateFabDaMaster.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.fabDaMaster.findIndex(
          (daConstant) => daConstant.id === action.payload.id
        );
        if (index !== -1) {
          state.fabDaMaster[index] = action.payload;
        }
        state.daSuccess = true;
      })
      .addCase(updateFabDaMaster.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot update";
      })
      .addCase(deleteFabDaMaster.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFabDaMaster.fulfilled, (state, action) => {
        state.loading = false;
        state.fabDaMaster = state.fabDaMaster.filter(
          (daConstant) => daConstant.id !== parseInt(action.payload.id)
        );
      })
      .addCase(deleteFabDaMaster.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot delete";
      })


      .addCase(fetchShopDa.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShopDa.fulfilled, (state, action) => {
        state.loading = false;
        state.shopDas = action.payload;
      })
      .addCase(fetchShopDa.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot fetch data";
      })
      .addCase(createShopDa.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.daSuccess = false;
      })
      .addCase(createShopDa.fulfilled, (state, action) => {
        state.loading = false;
        state.shopDas.push(action.payload)
        state.daSuccess = true;
      })
      .addCase(createShopDa.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot create";
      })
      .addCase(updateShopDa.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.daSuccess = false;
      })
      .addCase(updateShopDa.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.shopDas.findIndex(
          (shopDa) => shopDa.id === action.payload.id
        );
        if (index !== -1) {
          state.shopDas[index] = action.payload;
        }
        state.daSuccess = true;
      })
      .addCase(updateShopDa.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot update";
      })
      .addCase(deleteShopDa.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteShopDa.fulfilled, (state, action) => {
        state.loading = false;
        state.shopDas = state.shopDas.filter(
          (shopDa) => shopDa.id !== parseInt(action.payload.id)
        );
      })
      .addCase(deleteShopDa.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot delete";
      })


      .addCase(fetchFabDa.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFabDa.fulfilled, (state, action) => {
        state.loading = false;
        state.fabDas = action.payload;
      })
      .addCase(fetchFabDa.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot fetch data";
      })
      .addCase(createFabDa.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.designationSuccess = false;
      })
      .addCase(createFabDa.fulfilled, (state, action) => {
        state.loading = false;
        state.fabDas.push(action.payload)
        state.designationSuccess = true;
      })
      .addCase(createFabDa.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot create";
      })
      .addCase(updateFabDa.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.designationSuccess = false;
      })
      .addCase(updateFabDa.fulfilled, (state, action) => {
        const index = state.fabDas.findIndex(
          (fabda) => fabda.id === action.payload.id
        );
        if (index !== -1) {
          state.fabDas[index] = action.payload;
        }
        state.designationSuccess = true;
      })
      .addCase(updateFabDa.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot update";
      })
      .addCase(deleteFabDa.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFabDa.fulfilled, (state, action) => {
        state.loading = false;
        state.fabDas = state.fabDas.filter(
          (fabda) => fabda.id !== parseInt(action.payload.id)
        );
      })
      .addCase(deleteFabDa.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cannot delete";
      })
//ida
.addCase(fetchIDa.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(fetchIDa.fulfilled, (state, action) => {
  state.loading = false;
  state.fabDas = action.payload;
})
.addCase(fetchIDa.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload?.message || "Cannot fetch data";
})
.addCase(createIDa.pending, (state) => {
  state.loading = true;
  state.error = null;
  state.designationSuccess = false;
})
.addCase(createIDa.fulfilled, (state, action) => {
  state.loading = false;
  state.fabDas.push(action.payload)
  state.designationSuccess = true;
})
.addCase(createIDa.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload?.message || "Cannot create";
})
.addCase(updateIDa.pending, (state) => {
  state.loading = true;
  state.error = null;
  state.designationSuccess = false;
})
.addCase(updateIDa.fulfilled, (state, action) => {
  const index = state.iDas.findIndex(
    (fabda) => fabda.id === action.payload.id
  );
  if (index !== -1) {
    state.iDas[index] = action.payload;
  }
  state.designationSuccess = true;
})
.addCase(updateIDa.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload?.message || "Cannot update";
})
.addCase(deletIDa.pending, (state) => {
  state.loading = true;
})
.addCase(deletIDa.fulfilled, (state, action) => {
  state.loading = false;
  state.fabDas = state.iDas.filter(
    (fabda) => fabda.id !== parseInt(action.payload.id)
  );
})
.addCase(deletIDa.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload?.message || "Cannot delete";
})

  },
});

export const { clearDa } = daSlice.actions;
export default daSlice;