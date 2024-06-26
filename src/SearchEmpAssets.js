
  



// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Container, Table, Form, Button } from 'react-bootstrap';
// import './Hrmscss/App.css';

// function SearchEmpAssets() {
//   const token = localStorage.getItem("response-token");
//   const [searchAsset, setSearchAsset] = useState('');
//   const [asset, setAsset] = useState([]);

//   const handleNameChange = (event) => {
//     setSearchAsset(event.target.value);
//   }

//   const handleSubmit = () => {
//     axios.get(`/apigateway/hrms/masterAsset/searchByAssetUser?query=${searchAsset}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((response) => {
//       console.log(response.data);
//       setAsset(response.data);
//       toast.success('Assets data found successfully', { position: 'top-center', theme: 'colored' });
//     })
//     .catch((error) => {
//       console.log(error);
//       toast.error('Error occurred, try again later.', { position: 'top-center', theme: 'colored' });
//     });
//   }

//   const [assetTypes, setAssetTypes] = useState([]); // State for asset types
//   const [selectedAssetType, setSelectedAssetType] = useState(''); // State for selected asset type
//   const [selectedAssetStatus, setSelectedAssetStatus] = useState(''); // State for selected asset status

//   // Function to fetch asset types for the drop-down menu
//   // const fetchAssetTypes = () => {
//   //   axios.get(`/hrms/masterAsset/getAssetTypes`, {
//   //     headers: {
//   //       Authorization: `Bearer ${token}`,
//   //     },
//   //   })
//   //   .then((response) => {
//   //     console.log(response.data);
//   //     setAssetTypes(response.data);
//   //   })
//   //   .catch((error) => {
//   //     console.log(error);
//   //     toast.error('Error occurred while fetching asset types.', { position: 'top-center', theme: 'colored' });
//   //   });
//   // };

//   // Call the function to fetch asset types when the component mounts
//   // useEffect(() => {
//   //   fetchAssetTypes();
//   // }, []);

//   const handleSearchByTypeAndStatus = () => {
//     // Second API call: Search by asset type
//     axios.get(`/apigateway/hrms/masterAsset/searchByAssetType?query=${selectedAssetType}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((response) => {
//       console.log(response.data);
//       // Update the asset state with the data from the second API call
//       setAsset(response.data);
//       toast.success('Assets data found successfully', { position: 'top-center', theme: 'colored' });
//     })
//     .catch((error) => {
//       console.log(error);
//       toast.error('Error occurred while searching by asset type.', { position: 'top-center', theme: 'colored' });
//     });
//   };

//   const handleSearchByStatus = () => {
//     // Third API call: Search by asset status
//     axios.get(`/apigateway/hrms/masterAsset/searchByStatus?query=${selectedAssetStatus}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((response) => {
//       console.log(response.data);
//       // Update the asset state with the data from the third API call
//       setAsset(response.data);
//       toast.success('Assets data found successfully', { position: 'top-center', theme: 'colored' });
//     })
//     .catch((error) => {
//       console.log(error);
//       toast.error('Error occurred while searching by asset status.', { position: 'top-center', theme: 'colored' });
//     });
//   };
//   return (
//     <div className="table-responsive-sm">
//       <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
//         {/* Breadcrumb content */}
//       </nav>
//       <div style={{ marginTop: '50px', marginLeft: '80px', width: '820px', height: '60rem' }}>
//         <h1 className='Heading1'> Search Employee Assets</h1>
//         <Container>
//           <Form.Group controlId="employeeName">
//             <Form.Label>Search By Asset User</Form.Label>
//             <Form.Control type="text" placeholder="Enter Asset User" value={searchAsset} onChange={handleNameChange} style={{ width: '50%' }} />
//           </Form.Group>
//           <Button onClick={handleSubmit}>Search</Button>
// <br /> <br />
//           {/* Drop-down menu for selecting asset type */}
//           <Form.Group controlId="assetType">
//             <Form.Label>Search By Asset Type</Form.Label>
//             <Form.Control type="text" placeholder="Enter Asset Type" value={selectedAssetType} onChange={(e) => setSelectedAssetType(e.target.value)} style={{ width: '50%' }} />
//           </Form.Group>

//           {/* Button to trigger the second API call */}
//           <Button onClick={handleSearchByTypeAndStatus}>Search By Type</Button>
// <br /><br />
//           {/* Drop-down menu for selecting asset status */}
//           <Form.Group controlId="assetStatus">
//             <Form.Label>Search By Asset Status</Form.Label>
//             <Form.Control as="select" value={selectedAssetStatus} onChange={(e) => setSelectedAssetStatus(e.target.value)} style={{ width: '50%' }}>
//               <option value="">Select Asset Status</option>
//               {/* <option value="completed">Completed</option>
//               <option value="accepted">Accepted</option>
//               <option value="rejected">Rejected</option> */}
//                <option value="active">Active</option>
//               <option value="inactive">Inactive</option> 
//             </Form.Control>
//           </Form.Group>

//           {/* Button to trigger the third API call */}
//           <Button onClick={handleSearchByStatus}>Search By Status</Button>
//                <br />
//                <br />
               
//           <table border='2' className="table table-striped table-bordered">
//             <thead className="head">
//               <tr className="table-danger table-striped">
//                 <th>ID</th>
//                 <th>ASSET USER</th>
//                 <th>ASEET NAME</th>
//                 <th>ASEET ID</th>
//                 <th>ASEET NUMBER</th>
//                 <th>ASSET TYPE</th>
//                 <th>PROCESSOR</th>
//                 <th>RAM</th>
//                 <th>DISK TYPE</th>
//                 <th>OPERATING SYSTEM</th>
//                 <th>PURCHASE DATE</th>
//                 <th>WARRANTY</th>
//                 <th>WARRANTY DATE</th>
//                 <th>STATUS</th>
//               </tr>
//             </thead>
//             <tbody className="body">
//               {/* map over the asset array */}
//               {asset.map((assets) => (
//                 // display a <div> element with the asset.id and other asset details
//                 // parent element needs to have a unique key
//                 <tr key={assets.id}>
//                   <td><Link to={`/EditAssets/${assets.id}`} className="Candidate-id">{assets.id}</Link></td>
//                   <td>{assets.assetUser}</td>
//                   <td>{assets.assetName}</td>
//                   <td>{assets.assetId}</td>
//                   <td>{assets.assetNo}</td>
//                   <td>{assets.assetType}</td>
//                   <td>{assets.processor}</td>
//                   <td>{assets.ram}</td>
//                   <td>{assets.diskType}</td>
//                   <td>{assets.operatingSystem}</td>
//                   <td>{assets.purchesDate}</td>
//                   <td>{assets.warrenty}</td>
//                   <td>{assets.warrentyDate}</td>
//                   <td>{assets.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </Container>
//       </div>
//     </div>
//   )
// }

// export default SearchEmpAssets;
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Table, Form, Button } from 'react-bootstrap';
import './Hrmscss/App.css';

function SearchEmpAssets() {
  const token = localStorage.getItem("response-token");
  const [searchAsset, setSearchAsset] = useState('');
  const [asset, setAsset] = useState([]);

  const handleNameChange = (event) => {
    setSearchAsset(event.target.value);
  }

  const handleSubmit = () => {
    axios.get(`/apigateway/hrms/masterAsset/searchByAssetUser?query=${searchAsset}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        setAsset(response.data);
        toast.success('Assets data found successfully', { position: 'top-center', theme: 'colored' });
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error occurred, try again later.', { position: 'top-center', theme: 'colored' });
      });
  }

  const [assetTypes, setAssetTypes] = useState([]); // State for asset types
  const [selectedAssetType, setSelectedAssetType] = useState(''); // State for selected asset type
  const [selectedAssetStatus, setSelectedAssetStatus] = useState(''); // State for selected asset status
  const handleSearchByTypeAndStatus = () => {
    // Second API call: Search by asset type
    axios.get(`/apigateway/hrms/masterAsset/searchByAssetType?query=${selectedAssetType}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        // Update the asset state with the data from the second API call
        setAsset(response.data);
        toast.success('Assets data found successfully', { position: 'top-center', theme: 'colored' });
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error occurred while searching by asset type.', { position: 'top-center', theme: 'colored' });
      });
  };

  const handleSearchByStatus = () => {
    // Third API call: Search by asset status
    axios.get(`/apigateway/hrms/masterAsset/searchByStatus?query=${selectedAssetStatus}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        // Update the asset state with the data from the third API call
        setAsset(response.data);
        toast.success('Assets data found successfully', { position: 'top-center', theme: 'colored' });
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error occurred while searching by asset status.', { position: 'top-center', theme: 'colored' });
      });
  };
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);


    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className="table-responsive-sm">
      <div className=" mt-3">
        <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
          <ol className="breadcrumb" style={{ color: "white" }}>
            <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
            <li className="breadcrumb-item"><a href="">Employee Management</a></li>
            <li className="breadcrumb-item active" aria-current="page">Search Employee Asset</li>
          </ol>
        </nav>
      </div>
      <div className="d-flex justify-content-center  " style={{ width: screenWidth - 50 }}>
        <div>
          <h1 className='Heading1'> Search Employee Assets</h1>
          <Container>
            <div className="d-flex justify-content-between " style={{marginTop:'50px'}}>
              <Form.Group controlId="employeeName">
                <Form.Label>Search By Asset User</Form.Label>
                <div className="d-flex">
                  <Form.Control type="text" placeholder="Enter Asset User" value={searchAsset} onChange={handleNameChange} style={{ width: '40vh', marginBottom: 0 }} />
                  <Button onClick={handleSubmit} className=" mt-0 mx-2">Search</Button>
                </div>
              </Form.Group>

              <Form.Group controlId="assetType">
                <Form.Label>Search By Asset Type</Form.Label>
                <div className="d-flex">
                  <Form.Control type="text" placeholder="Enter Asset Type" className=" m-0" value={selectedAssetType} onChange={(e) => setSelectedAssetType(e.target.value)} style={{ width: '40vh', marginBottom: 0 }} />
                  <Button onClick={handleSearchByTypeAndStatus} className=" mt-0 mx-2">Search</Button>
                </div>
              </Form.Group>

              <Form.Group controlId="assetStatus">
                <Form.Label>Search By Asset Status</Form.Label>
                <div className="d-flex">
                  <Form.Control as="select" value={selectedAssetStatus} onChange={(e) => setSelectedAssetStatus(e.target.value)} style={{ width: '40vh', marginBottom: 0 }}>
                    <option value="">Select Asset Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Form.Control>
                  <Button onClick={handleSearchByStatus} className=" mt-0  ms-2">Search</Button>
                </div>
              </Form.Group>
            </div>

           

            <div style={{marginBottom:'60px', marginTop:'50px'}}>
            <table border='2' className="table table-striped table-bordered">
              <thead className="head">
                <tr className="table-danger table-striped">
                  <th>ID</th>
                  <th>ASSET USER</th>
                  <th>ASSET NAME</th>
                  <th>ASSET ID</th>
                  <th>ASSET NUMBER</th>
                  <th>ASSET TYPE</th>
                  <th>PROCESSOR</th>
                  <th>RAM</th>
                  <th>DISK TYPE</th>
                  <th>OPERATING SYSTEM</th>
                  <th>PURCHASE DATE</th>
                  <th>WARRANTY</th>
                  <th>WARRANTY DATE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody className="body">
                {asset.map((assets) => (
                  // display a <div> element with the asset.id and other asset details
                  // parent element needs to have a unique key
                  <tr key={assets.id}>
                    <td><Link to={`/EditAssets/${assets.id}`} className="Candidate-id">{assets.id}</Link></td>
                    <td>{assets.assetUser}</td>
                    <td>{assets.assetName}</td>
                    <td>{assets.assetId}</td>
                    <td>{assets.assetNo}</td>
                    <td>{assets.assetType}</td>
                    <td>{assets.processor}</td>
                    <td>{assets.ram}</td>
                    <td>{assets.diskType}</td>
                    <td>{assets.operatingSystem}</td>
                    <td>{assets.purchesDate}</td>
                    <td>{assets.warrenty}</td>
                    <td>{assets.warrentyDate}</td>
                    <td>{assets.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </Container>
        </div>
      </div>
    </div>
  )
}

export default SearchEmpAssets;
