import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { DataGrid } from '@mui/x-data-grid';

import { deletedReqColumns } from './RequestDataSource';
import Header from '../../components/Header';
import '../styles.css';

import VisibilityIcon from '@mui/icons-material/Visibility';

import swal from 'sweetalert';
import { Restore } from '@mui/icons-material';
import { Button } from '@mui/material';
import { DeleteOutlineSharp } from '@mui/icons-material';

const DeletedRequest = () => {
  const [reqdata, setReqData] = useState([]);

  //to get data when the application loads
  useEffect(() => {
    axios.get('http://localhost:3001/bin/all').then((response) => {
      setReqData(response.data);
      console.log(response.data);
    });
  }, []);

  //Restore Request
  const Restorage = (idbin) => {
    console.log('idbin', idbin);
    swal({
      text: 'Are you sure you want to restore?',
      buttons: true,
      dangerMode: true,
    }).then((willRestore) => {
      if (willRestore) {
        axios
          .delete(`http://localhost:3001/bin/restore/${idbin}`, {
            visibility: 1,
            status: 'Active',
            idbin: idbin,
          })
          .then((response) => {
            swal({
              title: 'Done !',
              text: 'Requet is restored',
              icon: 'success',
              timer: 2000,
              button: false,
            });
            setReqData(
              reqdata.filter((val) => {
                return val.idbin !== idbin;
              })
            );
          });
      } else {
        swal({
          text: 'Request is not restored !',
          timer: 2000,
          buttons: false,
        });
      }
    });
  };

  const DeleteAll = (e) => {
    e.preventDefault();

    swal({
      text: 'Are you sure you want to delete?',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.put('http://localhost:3001/bin/delete/all').then((response) => {
          swal({
            title: 'Done !',
            text: 'All help requests are deleted',
            icon: 'success',
            timer: 2000,
            button: false,
          });
          setReqData([]);
        });
      } else {
        swal({
          text: 'Deleted Requests details are restored !',
          buttons: false,
          timer: 2000,
        });
      }
    });
  };

  // action columns
  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`help/bin/${params.row.idbin}`}>
              <div className="viewButton">
                <VisibilityIcon fontSize="small" />
              </div>
            </Link>

            <div className="deleteButton">
              <Restore
                color="success"
                fontSize="small"
                onClick={() => Restorage(params.row.idbin)}
              />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Pages" title="Request History" />

        {/* <Grid item xs={6}>
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
        </Grid> */}

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

        <DataGrid
          columns={deletedReqColumns.concat(actionColumn)}
          rows={reqdata}
          getRowId={(row) => row.idbin}
          pageSize={8}
          rowsPerPageOptions={[5]}
          style={{ marginTop: '30px', fontFamily: 'Asap' }}
          getRowHeight={() => 'auto'}
          autoHeight
        />
      </div>
    </>
  );
};

export default DeletedRequest;
