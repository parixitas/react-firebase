import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { db } from '../../../firebase';
import AddSingleDie from './AddSingleDie';
import EditSingleDie from './EditSingleDie';
import { Button, Row, Col} from 'reactstrap';
import { FaWindowClose } from 'react-icons//fa';

class ListSingleDice extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            dice: [],
            diceSets: [],
            dieTypes: [],
        };
        this.getData = this.getData.bind(this);
        this.removeData = this.removeData.bind(this);
    }

    componentDidMount() {
        this.getData();
        this.getDice();
        this.getDiceSets();
        this.getDieTypes();
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

    getDice () {
        db.getObjects('Dice')
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
                dice: list,
            })
        });
    }

    getDiceSets () {
        db.getMyObjects(this.props.uid, 'DiceSets')
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
                diceSets: list,
            })
        });
    }

    getDieTypes () {
        db.getObjects('DieTypes')
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
                dieTypes: list,
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
                                        <AddSingleDie
                                            buttonLabel="Add" 
                                            modalTitle={`Add New ${this.props.baseObject}`} 
                                            handleRefresh={this.getData}
                                            uid={this.props.uid}
                                            dice = {this.state.dice}
                                            diceSets = {this.state.diceSets}
                                            dieTypes = {this.state.dieTypes}
                                        />
                                    </Col>
                                </Row>
                            ),
                            columns: [
                                {
                                    Header: "Die",
                                    accessor: "idDie",
                                    Cell: row => (
                                        <span>
                                            {[...this.state.dice].filter(a => a.id === row.value).map(a => { return a.title })}
                                        </span>
                                    )
                                },
                                {
                                    Header: "Owned",
                                    accessor: "quantity",
                                },
                                {
                                    Header: "For Sale?",
                                    accessor: "isWantToSell",
                                },
                                {
                                    Header: "Want?",
                                    accessor: "isWantToBuy",
                                },
                                {
                                    Header: "",
                                    width: 50,
                                    id: "delete",
                                    filterable: false,
                                    Cell: ({original}) => (
                                        <div>
                                            <Button color="secondary" onClick={() => this.removeData(original.key)}> <FaWindowClose /> </Button> 
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
                                            <EditSingleDie
                                                buttonLabel="Edit" 
                                                modalTitle="Edit Set" 
                                                dataRow={original} 
                                                uniqueId={original.key} 
                                                handleRefresh={this.getData}
                                                uid={this.props.uid}
                                                dice = {this.state.dice}
                                                diceSets = {this.state.diceSets}
                                                dieTypes = {this.state.dieTypes}
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

export default ListSingleDice;
