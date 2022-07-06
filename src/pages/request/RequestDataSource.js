import { Button } from '@mui/material';
//import user from '../../Assets/user.png';

export const userColumns = [
  { field: 'idRequest', headerName: 'Request ID', width: 100 },
  { field: 'site_name', headerName: 'Site Name', width: 100 },

  {
    field: 'category',
    headerName: 'Category',
    width: 200,
  },

  {
    field: 'problem',
    headerName: 'Problem',
    width: 300,
  },

  {
    field: 'status',
    headerName: 'Status',
    width: 180,
    renderCell: (params) => {
      return (
        <div>
          {params.row.status === 'Not yet Started' ? (
            <Button
              variant="contained"
              style={{ backgroundColor: '#355C7D' }}
              size="small"
            >
              Not yet Started
            </Button>
          ) : params.row.status === 'Progress' ? (
            <Button
              variant="contained"
              style={{ backgroundColor: '#6C5B7B' }}
              size="small"
            >
              Progress
            </Button>
          ) : (
            params.row.status ===
            'completed'(
              <Button
                variant="contained"
                style={{ backgroundColor: '#F8B195' }}
                size="small"
              >
                Completed
              </Button>
            )
          )}
        </div>
      );
    },
  },
  // {
  //   field: 'severity_level',
  //   headerName: 'Severity_level',
  //   width: 180,
  //   renderCell: (params) => {
  //     return (
  //       <div>
  //         {params.row.severity_level === 'Minor' ? (
  //           <Button
  //             variant="contained"
  //             style={{ backgroundColor: '#355C7D' }}
  //             size="small"
  //           >
  //             Minor
  //           </Button>
  //         ) : params.row.severity_level === 'Major' ? (
  //           <Button
  //             variant="contained"
  //             style={{ backgroundColor: '#6C5B7B' }}
  //             size="small"
  //           >
  //             Major
  //           </Button>
  //         ) : (
  //           params.row.severity_level ===
  //           'Critical'(
  //             <Button
  //               variant="contained"
  //               style={{ backgroundColor: '#F8B195' }}
  //               size="small"
  //             >
  //               Critical
  //             </Button>
  //           )
  //         )}
  //       </div>
  //     );
  //   },
  // },
];
