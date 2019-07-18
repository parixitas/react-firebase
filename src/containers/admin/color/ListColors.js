import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { db } from '../../../firebase';
import AddColor from './AddColor';
import EditColor from './EditColor';
import { Button, Col } from 'reactstrap';
import $ from 'jquery';

class ListColors extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            colorGroups: [],
        };
        this.getData = this.getData.bind(this);
        this.removeData = this.removeData.bind(this);
        this.complementaryColor = this.complementaryColor.bind(this);
    }

    componentDidMount() {
        this.getData();
        this.getColorGroups();
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

    getColorGroups() {
        db.getObjects('ColorGroups')
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
                    colorGroups: list,
                })
            });
    }

    complementaryColor = (color) => {
        const hexColor = color.replace('#', '0x');
        return `#${('000000' + (('0xffffff' ^ hexColor).toString(16))).slice(-6)}`;
    };

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
                                <AddColor
                                    buttonLabel="Add"
                                    modalTitle={`Add New ${this.props.baseObject}`}
                                    handleRefresh={this.getData}
                                    colorGroups={this.state.colorGroups}
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
                                                        Header: "Color",
                                                        accessor: "title",
                                                    },
                                                    {
                                                        Header: "Color Group",
                                                        accessor: "colorGroup",
                                                    },
                                                    // {
                                                    //     Header: "Pantone",
                                                    //     accessor: "pantoneCode",
                                                    // },
                                                    // {
                                                    //     Header: "RGB",
                                                    //     accessor: "rgbCode",
                                                    // },  
                                                    {
                                                        Header: 'Color',
                                                        accessor: 'hexCode',
                                                        Cell: row => (
                                                            <div className="text-center"
                                                                style={{
                                                                    border: '1px',
                                                                    padding: '7px',
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    backgroundColor: `${row.value}`,
                                                                    borderRadius: '2px',
                                                                    color: this.complementaryColor(`${row.value}`)
                                                                }}
                                                            >
                                                                {row.value}
                                                            </div>
                                                        )
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
                                                                <EditColor
                                                                    key={original.key}
                                                                    buttonLabel="Edit"
                                                                    modalTitle="Edit Color"
                                                                    dataRow={original}
                                                                    uniqueId={original.key}
                                                                    handleRefresh={this.getData}
                                                                    colorGroups={this.state.colorGroups}
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

export default ListColors;
