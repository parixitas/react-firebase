import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { db } from '../../../firebase';
import AddDiceSet from './AddDiceSet';
import EditDiceSet from './EditDiceSet';
import { Button, Row, Col} from 'reactstrap';
import { FaWindowClose } from 'react-icons//fa';

class ListDiceSets extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            sets: [],
            collections: [],
        };
        this.getData = this.getData.bind(this);
        this.removeData = this.removeData.bind(this);
    }

    componentDidMount() {
        this.getData();
        this.getSets();
        this.getCollections();
    }

    getData() {
        db.getMyObjects(this.props.uid, this.props.baseObject)
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

    getSets () {
        db.getObjects('Sets')
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
                sets: list,
            })
        });
    }

    getCollections () {
        db.getMyObjects(this.props.uid, 'Collections')
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
                collections: list,
            })
        });
    }

    removeData(itemId) {
        db.deleteMyObject(this.props.uid,this.props.baseObject, itemId)
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
                                        <AddDiceSet
                                            buttonLabel="Add" 
                                            modalTitle={`Add New ${this.props.baseObject}`} 
                                            handleRefresh={this.getData} 
                                            uid={this.props.uid}
                                            sets={this.state.sets}
                                            collections={this.state.collections}
                                        />
                                    </Col>
                                </Row>
                            ),
                            columns: [
                                {
                                    Header: "Dice Set",
                                    accessor: "idSet",
                                },
                                {
                                    Header: "Collection",
                                    accessor: "idCollection",
                                },
                                {
                                    Header: "Started",
                                    accessor: "startDate",
                                },  
                                {
                                    Header: "Tags",
                                    accessor: "tags",
                                },  
                                {
                                    Header: "Handmade?",
                                    accessor: "isHandmade",
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
                                            <EditDiceSet
                                                key={original.key}
                                                buttonLabel="Edit" 
                                                modalTitle="Edit DiceSet" 
                                                dataRow={original} 
                                                uniqueId={original.key} 
                                                handleRefresh={this.getData}  
                                                uid={this.props.uid}
                                                sets={this.state.sets}
                                                collections={this.state.collections}
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

export default ListDiceSets;
