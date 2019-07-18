import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { db } from '../../../firebase';
import AddProductLine from './AddProductLine';
import EditProductLine from './EditProductLine';
import { Button, Col } from 'reactstrap';
import $ from 'jquery';

class ListProductLines extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            manufacturers: [],
            styles: [],
            materials: [],
            colors: [],
        };
        this.getData = this.getData.bind(this);
        this.removeData = this.removeData.bind(this);
    }

    componentDidMount() {
        this.getData();
        this.getManufacturers();
        this.getStyles();
        this.getMaterials();
        this.getColors();
        $('.sidebar_ul a').each(function (index, value) {
            if ($(this).prop("href") === window.location.href) {
                $(this).addClass('active');
            }
        });

        $("#menu-toggle").click(function(e) {
            e.preventDefault();
            $("#wrapper").toggleClass("active");
          
        });
    }

    getData() {
        db.getObjects(this.props.baseObject)
            .then(snapshot => {
                const tempResults = snapshot.val();
                if (tempResults) {
                    // Need to tweak the object to put the key into the data so the firebase ID is accessible
                    const results = Object.entries(tempResults).map(e => Object.assign(e[1], { key: e[0] }));
                    // console.log(results)
                    this.setState({ data: Object.values(results) });
                } else {
                    this.setState({ data: [] });
                }
            });
    }

    getManufacturers() {
        db.getObjects('Manufacturers')
            .then(snapshot => {
                let data = snapshot.val();
                let list = [];
                for (let item in data) {
                    list.push({
                        id: item,
                        title: data[item].title,
                    })
                }
                this.setState({
                    manufacturers: list,
                })
            });
    }

    getStyles() {
        db.getObjects('Styles')
            .then(snapshot => {
                let data = snapshot.val();
                let list = [];
                for (let item in data) {
                    list.push({
                        id: item,
                        title: data[item].title,
                    })
                }
                this.setState({
                    styles: list,
                })
            });
    }

    getMaterials() {
        db.getObjects('Materials')
            .then(snapshot => {
                let data = snapshot.val();
                let list = [];
                for (let item in data) {
                    list.push({
                        id: item,
                        title: data[item].title,
                    })
                }
                this.setState({
                    materials: list,
                })
            });
    }

    getColors() {
        db.getObjects('Colors')
            .then(snapshot => {
                let data = snapshot.val();
                let list = [];
                for (let item in data) {
                    list.push({
                        id: item,
                        title: data[item].title,
                    })
                }
                this.setState({
                    colors: list,
                })
            });
    }

    removeData(itemId) {
        db.deleteObject(this.props.baseObject, itemId)
            .then(d => { this.getData(); })
    }

    render() {
        const { data } = this.state;
        return (
            <div>
                <div id="page-wrapper">
                    <div className="container-fluid">
                        <div className="row bg-title">
                            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                <h4 className="page-title">{this.props.baseObject}</h4> </div>
                            <div className="col-lg-9 col-sm-8 col-md-8 col-xs-12">
                                <AddProductLine
                                    buttonLabel="Add"
                                    modalTitle={`Add New ${this.props.baseObject}`}
                                    handleRefresh={this.getData}
                                    manufacturers={this.state.manufacturers}
                                    styles={this.state.styles}
                                    materials={this.state.materials}
                                    colors={this.state.colors}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="white-box">
                                    <ReactTable
                                        data={data}
                                        columns={[
                                            {
                                                columns: [
                                                    {
                                                        Header: "ProductLine",
                                                        accessor: "title",
                                                    },
                                                    {
                                                        Header: "Manufacturer",
                                                        accessor: "manufacturer",
                                                    },
                                                    {
                                                        Header: "Version",
                                                        accessor: "version",
                                                    },
                                                    {
                                                        Header: "Color",
                                                        accessor: "primaryColor",
                                                        width: 90,
                                                    },
                                                    {
                                                        Header: "OOP?",
                                                        accessor: "isOutOfPrint",
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
                                                                <EditProductLine modalTitle="Edit ProductLine" dataRow={original} uniqueId={original.key} handleRefresh={this.getData} manufacturers={this.state.manufacturers} styles={this.state.styles} materials={this.state.materials} colors={this.state.colors} />
                                                            </Col>
                                                        )
                                                    },
                                                ]
                                            }

                                        ]}
                                        defaultPageSize={10}
                                        className=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListProductLines;
