import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { db } from '../../../firebase';
import { Row, Col } from 'reactstrap';

class ShowDiceSets extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
        };
        this.getData = this.getData.bind(this);
        this.complementaryColor = this.complementaryColor.bind(this);
    }

    componentDidMount() {
        this.getData();
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

    complementaryColor = (color) => {
        const hexColor = color.replace('#', '0x');
        return `#${('000000' + (('0xffffff' ^ hexColor).toString(16))).slice(-6)}`;
    };

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

export default ShowDiceSets;
