import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { db } from '../../../firebase';
import AddDie from './AddDie';
import EditDie from './EditDie';
import { Button, Col } from 'reactstrap';
import $ from 'jquery';

class ListDice extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            faceShapes: [],
            faceTypes: [],
            faceLayouts: [],
            dieTypes: [],
            pipTypes: [],
            shapes: [],
            sets: [],
        };
        this.getData = this.getData.bind(this);
        this.removeData = this.removeData.bind(this);
    }

    componentDidMount() {
        this.getData();
        this.getFaceShapes();
        this.getFaceTypes();
        this.getFaceLayouts();
        this.getDieTypes();
        this.getPipTypes();
        this.getShapes();
        this.getSets();
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

    getFaceShapes() {
        db.getObjects('FaceShapes')
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
                    faceShapes: list,
                })
            });
    }

    getFaceTypes() {
        db.getObjects('FaceTypes')
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
                    faceTypes: list,
                })
            });
    }

    getFaceLayouts() {
        db.getObjects('FaceLayouts')
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
                    faceLayouts: list,
                })
            });
    }

    getDieTypes() {
        db.getObjects('DieTypes')
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
                    dieTypes: list,
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

    getShapes() {
        db.getObjects('Shapes')
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
                    shapes: list,
                })
            });
    }

    getSets() {
        db.getObjects('Sets')
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
                    sets: list,
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
                                <AddDie
                                    buttonLabel="Add"
                                    modalTitle={`Add New ${this.props.baseObject}`}
                                    handleRefresh={this.getData}
                                    faceShapes={this.state.faceShapes}
                                    faceTypes={this.state.faceTypes}
                                    faceLayouts={this.state.faceLayouts}
                                    dieTypes={this.state.dieTypes}
                                    pipTypes={this.state.pipTypes}
                                    shapes={this.state.shapes}
                                    sets={this.state.sets}
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
                                                        Header: "Die",
                                                        accessor: "title",
                                                    },
                                                    {
                                                        Header: "Set",
                                                        accessor: "idSet",
                                                    },
                                                    {
                                                        Header: "Faces",
                                                        accessor: "faces",
                                                    },
                                                    {
                                                        Header: "Type",
                                                        accessor: "dieType",
                                                    },
                                                    {
                                                        Header: "Size",
                                                        accessor: "maxSize",
                                                    },
                                                    {
                                                        Header: "Weight",
                                                        accessor: "weight",
                                                    },
                                                    {
                                                        Header: "Index",
                                                        accessor: "setIndex",
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
                                                                <EditDie
                                                                    buttonLabel="Edit"
                                                                    modalTitle="Edit Color Group"
                                                                    dataRow={original}
                                                                    uniqueId={original.key}
                                                                    handleRefresh={this.getData}
                                                                    faceShapes={this.state.faceShapes}
                                                                    faceTypes={this.state.faceTypes}
                                                                    faceLayouts={this.state.faceLayouts}
                                                                    dieTypes={this.state.dieTypes}
                                                                    pipTypes={this.state.pipTypes}
                                                                    shapes={this.state.shapes}
                                                                    sets={this.state.sets}
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

export default ListDice;
