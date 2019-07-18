import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { db } from '../../../firebase';
import AddManufacturer from './AddManufacturer';
import EditManufacturer from './EditManufacturer';
import { Button, Col } from 'reactstrap';
import $ from 'jquery';





$.DatatTable = require('datatables.net')

class ListManufacturers extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
        };
        this.getData = this.getData.bind(this);

        this.removeData = this.removeData.bind(this);

    }

    componentDidMount() {
        this.getData();



        $('.sidebar_ul a').each(function (index, value) {
            if ($(this).prop("href") === window.location.href) {
                $(this).addClass('active');
            }
        });

        $("#menu-toggle").click(function (e) {
            e.preventDefault();
            $("#wrapper").toggleClass("active");

        });

       


    }

    removeData(itemId) {
        alert();
        db.deleteObject(this.props.baseObject, itemId)
            .then(d => { this.getData(); })
    }

    getData() {
        db.getObjects(this.props.baseObject)
            .then(snapshot => {
                const tempResults = snapshot.val();
                if (tempResults) {
                    // Need to tweak the object to put the key into the data so the firebase ID is accessible
                    // const results = Object.entries(tempResults).map(e => Object.entries(e[1]).map(w => w[1]));
                    const results = Object.entries(tempResults).map(e => Object.assign(e[1]));

                    this.setState({ data: Object.values(results) });

                } else {
                    this.setState({ data: [] });
                }
            });
    }



   

    render() {

        const { data } = this.state;

        return (

            <div>
                <div id="page-wrapper">
                    <div className="container-fluid">
                        <div className="row bg-title">
                            <div className="col-4">
                                <h4 className="page-title">Manufacturers</h4> </div>
                            <div className="col-8">
                                <AddManufacturer modalTitle="Add a New Manufacturer" handleRefresh={this.getData} />
                            </div>
                        </div>
                        <div className="row">
                            {<div className="col-lg-12">
                                <div className="white-box">
                                    {<ReactTable
                                        data={data}
                                        columns={[
                                            {
                                                columns: [
                                                    {
                                                        Header: "Company",
                                                        accessor: "title",
                                                    },
                                                    {
                                                        Header: "Website",
                                                        accessor: "website",
                                                    },
                                                    {
                                                        Header: "Country",
                                                        accessor: "country",

                                                    },
                                                    {
                                                        Header: "?",
                                                        accessor: "isActive",
                                                        width: 60,
                                                    },
                                                    {
                                                        Header: "",
                                                        width: 90,
                                                        id: "delete",
                                                        filterable: false,
                                                        Cell: ({ original }) => (
                                                            <div>

                                                                <Button type="button" className="btn btn-danger dangerbtn" onClick={() => this.removeData(original.key)}><i className="fa fa-trash" aria-hidden="true"></i></Button>
                                                                {/* <Button color="secondary" onClick={() => this.removeData(original.key)}> <FaWindowClose /> </Button>} */}
                                                            </div>
                                                        )
                                                    },
                                                    {
                                                        Header: "",
                                                        width: 90,
                                                        id: "edit",
                                                        filterable: false,
                                                        Cell: ({ original }) => (
                                                            <Col className="text-right">
                                                                <EditManufacturer modalTitle="Edit Manufacturer" dataRow={original} uniqueId={original.key} handleRefresh={this.getData} />
                                                            </Col>
                                                        )
                                                    },
                                                ],
                                                expanderDefaults: {
                                                    sortable: false,
                                                    resizable: false,
                                                    filterable: false,
                                                    width: 35
                                                },
                                            }

                                        ]}
                                        defaultPageSize={10}
                                        className="table-responsive" />}
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }



}



export default ListManufacturers;
