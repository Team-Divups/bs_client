import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import Header from '../../components/Header';
import { userColumns } from './RequestDataSource';
import swal from 'sweetalert';
import axios from 'axios';

import { Button } from '@mui/material';
import {
  AddCircleRounded,
  DeleteOutlineSharp,
  DeleteSweepRounded,
} from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ListRequest = () => {
  const [requestdata, setRequestData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/request/all').then((response) => {
      setRequestData(response.data);
    });
  }, []);

  const Delete = (idRequest) => {
    //console.log(idRequest);
    swal({
      text: 'Are you sure you want to delete?',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:3001/request/delete/${idRequest}`)
          .then((response) => {
            swal({
              title: 'Done !',
              text: 'Help Request is deleted',
              icon: 'success',
              timer: 2000,
              button: false,
            });
            setRequestData(
              requestdata.filter((val) => {
                return val.idRequest !== idRequest;
              })
            );
          });
      } else {
        swal({
          text: 'Help Request details are restored !',
          timer: 2000,
          buttons: false,
        });
      }
    });
  };

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 140,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/help/view/${params.row.idRequest}`}>
              <div className="viewButton">
                <VisibilityIcon fontSize="small" />
              </div>
            </Link>

            <Link to={`/help/edit/${params.row.idRequest}`}>
              <div className="editButton">
                <EditIcon fontSize="small" />
              </div>
            </Link>

            <div className="deleteButton">
              <DeleteIcon
                fontSize="small"
                onClick={() => {
                  Delete(params.row.idRequest);
                }}
              />
            </div>
          </div>
        );
      },
    },
  ];

  const DeleteAll = (e) => {
    e.preventDefault();

    swal({
      text: 'Are you sure you want to delete?',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete('http://localhost:3001/help/delete/all')
          .then((response) => {
            swal({
              title: 'Done !',
              text: 'All help requests are deleted',
              icon: 'success',
              timer: 2000,
              button: false,
            });
          });
      } else {
        swal({
          text: 'Subscription details are restored !',
          buttons: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <>
      {/* <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Help Request" />
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <span className="dataTableTitle">Overview of Help Request</span>
          </Grid>

          <Grid item xs={3}>
            <span style={{ paddingLeft: '30px', paddingRight: '20px' }}>
              <Button
                style={{ backgroundColor: '#84fae4' }}
                size="small"
                variant="contained"
                onClick={DeleteAll}
                endIcon={<DeleteSweepRounded />}
              >
                Recycle Bin
              </Button>
            </span>
            <span style={{ paddingLeft: '30px', paddingRight: '20px' }}>
              <Button
                style={{ backgroundColor: 'red' }}
                size="small"
                variant="contained"
                onClick={DeleteAll}
                endIcon={<DeleteOutlineSharp />}
              >
                Delete All
              </Button>
            </span>

            <span>
              <Link to="/help/new">
                <Button
                  size="small"
                  variant="contained"
                  endIcon={<AddCircleRounded />}
                >
                  Add
                </Button>
              </Link>
            </span>
          </Grid>
        </Grid> */}

      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Pages" title="Help Request" />

        <Grid container spacing={2}>
          <Grid item xs={7}>
            <span className="dataTableTitle">Overview of Help Request</span>
          </Grid>

          <Grid item xs={6}>
            <span style={{ paddingRight: '25px' }}>
              <Link to="/help/bin">
                <Button
                  size="small"
                  variant="contained"
                  style={{ backgroundColor: '#84fae4' }}
                  endIcon={<DeleteSweepRounded />}
                >
                  Recycle Bin
                </Button>
              </Link>
            </span>

            <span style={{ paddingRight: '25px' }}>
              <Button
                style={{ backgroundColor: 'red' }}
                size="small"
                variant="contained"
                onClick={DeleteAll}
                endIcon={<DeleteOutlineSharp />}
              >
                Delete All
              </Button>
            </span>

            <span>
              <Link to="/help/new">
                <Button
                  size="small"
                  variant="contained"
                  endIcon={<AddCircleRounded />}
                >
                  Create
                </Button>
              </Link>
            </span>
          </Grid>
        </Grid>

        <DataGrid
          columns={userColumns.concat(actionColumn)}
          rows={requestdata}
          getRowId={(row) => row.idRequest}
          pageSize={10}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          style={{ marginTop: '30px', fontFamily: 'Asap' }}
          getRowHeight={() => 'auto'}
          autoHeight
        />
      </div>
    </>
  );
};

export default ListRequest;
