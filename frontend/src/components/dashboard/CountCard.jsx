import React from 'react'
import "./CountCard.scss";

const CountCard = ({title, icon, date, count, color}) => {
  return (
    <div className="card card-stats mb-4 mb-xl-0">
      <div className="card-body">
        <div className="row">
          <div className="col">
            <h5 className="card-title text-uppercase text-muted mb-0">{title}</h5>
            <br/>
            <span className="h2 font-weight-bold mb-0">{count}</span>
          </div>
          <div className="col-auto">
            <div className="icon icon-shape text-white rounded-circle shadow" style={{backgroundColor: color}}>
              <i className={icon}></i>
            </div>
          </div>
        </div>
        <p className="mt-3 mb-0 text-muted text-sm" style={{paddingTop: "35px"}}>
          <span className="text-success mr-2"><i className="bi bi-graph-up"></i> {date}</span>
          <span className="text-nowrap"> On </span>
        </p>
      </div>
    </div>
  )
}

export default CountCard