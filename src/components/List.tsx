import React from 'react'


const List = () => {
    return (
        <div>
            <div className="ticket-list-button">
                <ul className="nav nav-pills ticket-button" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation" id="list" data-bs-toggle="tab">
                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                            List
                        </button>
                    </li>
                    <li className="nav-item" role="presentation" data-bs-toggle="tab">
                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" tabIndex={-1}>
                            Details
                        </button>
                    </li>
                </ul>
            </div>
            <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane fade active show" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr className="table-heading">
                      <th scope="col">NO</th>
                      <th scope="col">NAME</th>
                      <th scope="col">COMPLINE ID</th>
                      <th scope="col">LATEST MESSAGE</th>
                      <th scope="col">ASSIGNED</th>
                      <th scope="col">PRIORITY</th>
                      <th scope="col">STATUS</th>
                      <th scope="col">ACTION</th>
                    </tr>
                  </thead>
                  <tbody id="ticket-printing" className="table-list"></tbody>
                </table>
              </div>
              <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                <div className="card ticket-details" id="ticket-card"></div>
              </div>
            </div>
        </div>
    )
}

export default List
