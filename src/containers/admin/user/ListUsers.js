import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { db } from '../../../firebase';
import EditUser from './EditUser';
import { Button, Row, Col} from 'reactstrap';
import { FaWindowClose } from 'react-icons//fa';
import $ from 'jquery';

class ListUsers extends Component {
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

        $("#menu-toggle").click(function(e) {
            e.preventDefault();
            $("#wrapper").toggleClass("active");
          
        });
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
                                </Row>
                            ),
                            columns: [
                                {
                                    Header: "Username",
                                    accessor: "username",
                                },
                                {
                                    Header: "Email",
                                    accessor: "email",
                                },
                                // {
                                //     Header: "Display Name",
                                //     accessor: "displayName",
                                // },  
                                // {
                                //     Header: "Photo",
                                //     accessor: "photoURL",
                                // },
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
                                            <EditUser buttonLabel="Edit" modalTitle="Edit User" dataRow={original} uniqueId={original.key} handleRefresh={this.getData}/>
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

export default ListUsers;
