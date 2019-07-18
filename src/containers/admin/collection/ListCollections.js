import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { db } from '../../../firebase';
import AddCollection from './AddCollection';
import EditCollection from './EditCollection';
import { Button, Row, Col} from 'reactstrap';
import { FaWindowClose } from 'react-icons//fa';

class ListCollections extends Component {
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
        this.complementaryColor = this.complementaryColor.bind(this);
    }

    componentDidMount() {
        this.getData();
        this.getManufacturers();
        this.getStyles();
        this.getMaterials();
        this.getColors();
    }

    getData() {
        db.getObjects(this.props.baseObject)
            .then(snapshot => {
                const tempResults = snapshot.val();
                if(tempResults) {
                    // Need to tweak the object to put the key into the data so the firebase ID is accessible
                    const results = Object.entries(tempResults).map(e => Object.assign(e[1], { key: e[0] }));
                    // console.log(results)
                    this.setState({ data: Object.values(results)});
                } else {
                    this.setState({ data: [] });
                }
            });
    }

    getManufacturers () {
        db.getObjects('Manufacturers')
        .then(snapshot => {
            let data = snapshot.val();
            let list = [];
            for(let item in data) {
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

    getStyles () {
        db.getObjects('Styles')
        .then(snapshot => {
            let data = snapshot.val();
            let list = [];
            for(let item in data) {
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

    getMaterials () {
        db.getObjects('Materials')
        .then(snapshot => {
            let data = snapshot.val();
            let list = [];
            for(let item in data) {
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

    getColors () {
        db.getObjects('Colors')
        .then(snapshot => {
            let data = snapshot.val();
            let list = [];
            for(let item in data) {
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

    complementaryColor = (color) => {
        const hexColor = color.replace('#', '0x');
        return `#${('000000' + (('0xffffff' ^ hexColor).toString(16))).slice(-6)}`;
    };

    removeData(itemId) {
        db.deleteObject(this.props.baseObject, itemId)
            .then( d => {this.getData();})
    } 
    
    render() {
        const { data } = this.state;
        return (
            <div>
                <ReactTable
                    data={ data }
                    columns={[
                        {
                            Header: () => (
                                <Row>
                                    <Col xs={{ size: 8, offset: 2}}><h2>{this.props.baseObject}</h2></Col>
                                    <Col xs="2" className="text-right">
                                        <AddCollection
                                            buttonLabel="Add" 
                                            modalTitle={`Add New ${this.props.baseObject}`} 
                                            handleRefresh={this.getData} 
                                            manufacturers={this.state.manufacturers} 
                                            styles={this.state.styles} 
                                            materials={this.state.materials} 
                                            colors={this.state.colors}
                                        />
                                    </Col>
                                </Row>
                            ),
                            columns: [
                                {
                                    Header: "Collection",
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
                                },  
                                {
                                    Header: "OOP?",
                                    accessor: "isOutOfPrint",
                                    width: 60,
                                },
                                {
                                    Header: "",
                                    width: 50,
                                    id: "delete",
                                    filterable: false,
                                    Cell: ({original}) => (
                                        <div>
                                            <Button 
                                                color="secondary" 
                                                onClick={() => this.removeData(original.key)}
                                            > 
                                                <FaWindowClose /> 
                                            </Button> 
                                        </div>
                                    )
                                },
                                {
                                    Header: "",
                                    width: 90,
                                    id: "edit",
                                    filterable: false,
                                    Cell: ({original}) => (
                                        <Col className="text-right">
                                            <EditCollection
                                                key={original.key}
                                                buttonLabel="Edit" 
                                                modalTitle="Edit Collection" 
                                                dataRow={original} 
                                                uniqueId={original.key} 
                                                handleRefresh={this.getData}  
                                                manufacturers={this.state.manufacturers} 
                                                styles={this.state.styles} 
                                                materials={this.state.materials} 
                                                colors={this.state.colors}
                                            />
                                        </Col>
                                    )
                                },
                            ]
                        }

                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
            </div>
        );
    }
}

export default ListCollections;
