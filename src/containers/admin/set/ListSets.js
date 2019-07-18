import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { db } from '../../../firebase';
import AddSet from './AddSet';
import EditSet from './EditSet';
import { Button, Col } from 'reactstrap';
import $ from 'jquery';

class ListSets extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            setTypes: [],
            unitOfMeasures: [],
            productLines: [],
            setStyles: [],
            materials: [],
            colors: [],
            pipTypes: [],
            fonts: [],
        };
        this.getData = this.getData.bind(this);
        this.removeData = this.removeData.bind(this);
    }

    componentDidMount() {
        this.getData();
        this.getSetTypes();
        this.getUnitOfMeasures();
        this.getProductLines();
        this.getSetStyles();
        this.getMaterials();
        this.getColors();
        this.getPipTypes();
        this.getFonts();
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

    getSetTypes() {
        db.getObjects('SetTypes')
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
                    setTypes: list,
                })
            });
    }

    getUnitOfMeasures() {
        db.getObjects('UnitOfMeasures')
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
                    unitOfMeasures: list,
                })
            });
    }

    getProductLines() {
        db.getObjects('ProductLines')
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
                    productLines: list,
                })
            });
    }

    getSetStyles() {
        db.getObjects('SetStyles')
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
                    setStyles: list,
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

    getPipTypes() {
        db.getObjects('PipTypes')
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
                    pipTypes: list,
                })
            });
    }

    getFonts() {
        db.getObjects('Fonts')
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
                    font: list,
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
                                <AddSet
                                    buttonLabel="Add"
                                    modalTitle={`Add New ${this.props.baseObject}`}
                                    handleRefresh={this.getData}
                                    setTypes={this.state.setTypes}
                                    unitOfMeasures={this.state.unitOfMeasures}
                                    productLines={this.state.productLines}
                                    setStyles={this.state.setStyles}
                                    materials={this.state.materials}
                                    colors={this.state.colors}
                                    pipTypes={this.state.pipTypes}
                                    fonts={this.state.fonts}

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
                                                        Header: "Set",
                                                        accessor: "title",
                                                    },
                                                    {
                                                        Header: "Product Line",
                                                        accessor: "idProductLine",
                                                    },
                                                    {
                                                        Header: "Dice",
                                                        accessor: "dieCount",
                                                        width: 50,
                                                    },
                                                    {
                                                        Header: "Type",
                                                        accessor: "setType",
                                                    },
                                                    {
                                                        Header: "Colors",
                                                        accessor: "color1",
                                                        width: 100,
                                                    },
                                                    {
                                                        Header: "Size",
                                                        accessor: "maxSize",
                                                        width: 50,
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
                                                                <EditSet

                                                                    modalTitle="Edit Color Group"
                                                                    dataRow={original}
                                                                    uniqueId={original.key}
                                                                    handleRefresh={this.getData}
                                                                    setTypes={this.state.setTypes}
                                                                    unitOfMeasures={this.state.unitOfMeasures}
                                                                    productLines={this.state.productLines}
                                                                    setStyles={this.state.setStyles}
                                                                    materials={this.state.materials}
                                                                    colors={this.state.colors}
                                                                    pipTypes={this.state.pipTypes}
                                                                    fonts={this.state.fonts}
                                                                />
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

export default ListSets;
