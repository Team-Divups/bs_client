import { Button } from '@mui/material';
//import user from '../../Assets/user.png';

export const userColumns = [
    { field: 'companyId', headerName: 'UserId', width: 130 },

    {
      field: 'user',
      headerName: 'User',
      width: 300,
      renderCell: (params) => {
        return (
          <div>
              <b>{params.row.firstname} {params.row.lastName}</b><br/>
              <span color='grey'>{params.row.email}</span>
          </div>
        )
      }
    },

    {
      field: 'position',
      headerName: 'Designation',
      width: 200,
    },
   
    {
        field: 'id_clientRole',
        headerName: 'Role',
        width: 180,
        renderCell: (params) => {
          return (
              <div>
                  {params.row.id_clientRole === 1 ? (
                     <Button variant="contained" style={{backgroundColor:"#355C7D"}} size="small">Admin</Button>
                  ) : params.row.id_clientRole === 2 ? (
                     <Button variant="contained" style={{backgroundColor:"#6C5B7B"}} size="small">Moderator</Button>
                  ) :(
                     <Button variant="contained" style={{backgroundColor:"#F8B195"}} size="small">User</Button>
                  )}
              </div>
          )
        }
    },


    {
        field: 'status',
        headerName: 'status',
        width: 130,
        renderCell: (params) => {
          return (
              <div>
                  {params.row.status === 0 ? (
                     <Button variant="contained" style={{backgroundColor:'gold'}} size="small">Invited</Button>
                  ) : (
                     <Button variant="contained" style={{backgroundColor:'silver'}} size="small">Active</Button>
                  )}
              </div>
          )
        }
    },

   
]