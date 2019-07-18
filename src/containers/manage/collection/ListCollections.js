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
        };
        this.getData = this.getData.bind(this);
        this.removeData = this.removeData.bind(this);
    }

    componentDidMount() {
        this.getData();
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
                                        <AddCollection
                                            buttonLabel="Add" 
                                            modalTitle={`Add New ${this.props.baseObject}`} 
                                            handleRefresh={this.getData} 
                                            uid={this.props.uid}
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
                                    Header: "Version",
                                    accessor: "version",
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
                                            <EditCollection
                                                key={original.key}
                                                buttonLabel="Edit" 
                                                modalTitle="Edit Collection" 
                                                dataRow={original} 
                                                uniqueId={original.key} 
                                                handleRefresh={this.getData}  
                                                uid={this.props.uid}
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
