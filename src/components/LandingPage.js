import React, { useState, useEffect } from "react";

const LandingPage = () => {
  //Initial array of objects to be obtained from the form
  const [storedData, setStoredData] = useState([]);
  const [formData, setFormData] = useState({
    ussdCode: "",
    ussdUrl: "",
    phoneNumber: "",
    networkName: "",
  });

  //Adds the USSD code to the array after the submit button has been clicked
  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = { ...formData, id: Date.now() }; // Add an "id" property
    setStoredData([...storedData, newData]);

    //stores the formData to the local browser storage
    localStorage.setItem("ussdCodes", JSON.stringify([...storedData, newData]));

    setFormData({
      ussdCode: "",
      ussdUrl: "",
      phoneNumber: "",
      networkName: "",
    });
  };

  //State for update mode
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    // Retrieve data from localStorage
    const storedFormData = localStorage.getItem("ussdCodes");
    if (storedFormData) {
      setStoredData(JSON.parse(storedFormData));
      // localStorage.removeItem('formData', JSON.stringify(formData))
    }
  }, []);
  //this handles changes made to the input forms
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Deleting data from the local Storage
  const handleDelete = (itemToDelete) => {
    const newData = storedData.filter((item) => item.id !== itemToDelete);
    setStoredData(newData);
    // localStorage.removeItem(newData);
    localStorage.setItem("ussdCodes", JSON.stringify(newData));
    // setStoredData();
    console.log(storedData);
    console.log(newData);
  };

  //update mode functionality
  const toggleUpdateMode = (passedID) => {
    // console.log(passedID)
    setUpdateMode(true);


    const codes = JSON.parse(localStorage.getItem("ussdCodes"));
    const data = codes.find((obj) => obj.id === passedID);

    setFormData({
      passedID,
      ussdCode: data.ussdCode,
      ussdUrl: data.ussdUrl,
      phoneNumber: data.phoneNumber,
      networkName: data.networkName,
    });
  };

  // const handleUpdate = (updatedFormData) => {
  //   // Find the index of the item to be updated
  //   const indexToUpdate = storedData.findIndex((item) => item.id === updatedFormData.id);
  
  //   // If the item is found, update its properties
  //   if (indexToUpdate !== -1) {
  //     const newData = { ...formData, id: updatedFormData.id }; // Add an "id" property
  //   setStoredData([...storedData]);

  //   //stores the formData to the local browser storage
  //   localStorage.setItem("ussdCodes", JSON.stringify([...storedData]));
       
  //     };

      
  
      // Update the state and localStorage with the modified data
      // setStoredData(updatedData1);
      // localStorage.setItem("ussdCodes", JSON.stringify(updatedData1));
  
      // Reset the form data and update mode
    //   setFormData({
    //     ussdCode: "",
    //     ussdUrl: "",
    //     phoneNumber: "",
    //     networkName: "",
    //   });
    //   setUpdateMode(false);
    // }
  
    const handleUpdate = () => {
      
      const filteredData = storedData.filter(data => data.id !== formData.passedID); 
    setStoredData([...filteredData,formData]);

    //stores the formData to the local browser storage
    localStorage.setItem("ussdCodes", JSON.stringify([...filteredData, formData]));

    setFormData({
      ussdCode: "",
      ussdUrl: "",
      phoneNumber: "",
      networkName: "",
    });



      
    }








  return (
    <div className="flex items-center w-screen h-full text-center flex-col">
      <div className=" font-bold text-3xl p-3">USSD Simulator</div>
      <div className="p-5 flex w-auto h-full items-center">
        <div className="w-[500px] h-[500px]  border-[3px] flex flex-col items-center">
          <div className="p-3 font-bold text-xl">Add new USSD</div>
          <div className="w-[400px] h-[430px] border-2 flex flex-col">
            {!updateMode ? (
              <form onSubmit={handleSubmit} className="p-2 flex flex-col ">
                <div className="p-1">
                  <div className="">Enter USSD code:</div>
                  <input
                    name="ussdCode"
                    value={formData.ussdCode}
                    onChange={handleChange}
                    className="required: w-[260px]  border-2 rounded border-black py-1 px-1"
                  />
                </div>
                <div className="p-1">
                  <div className="">Enter USSD URL:</div>
                  <input
                    name="ussdUrl"
                    value={formData.ussdUrl}
                    onChange={handleChange}
                    className="required: w-[260px] border-2 rounded border-black py-1 px-1"
                  />
                </div>
                <div className="p-1">
                  <div className="">Enter Phone Number:</div>
                  <input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="required: w-[260px] border-2 rounded border-black py-1 px-1"
                  />
                </div>
                <div className="p-1">
                  <div className="">Enter Network Name:</div>
                  <input
                    name="networkName"
                    value={formData.networkName}
                    onChange={handleChange}
                    className="required: w-[260px] border-2 rounded border-black py-1 px-1"
                  />
                </div>
                <div className=" w-full items-center text-center p-3">
                  <button
                    className="items-center border-solid bg-blue-400 text-white h-[50px] w-[80px] rounded hover:bg-blue-800"
                    type="submit"
                  >
                    Add USSD
                  </button>
                </div>
                {/* {console.log(storedData)} */}
              </form>
            ) : (
              <form  onSubmit={ handleUpdate} className="p-2 flex flex-col ">
                <div className="p-1">
                  <div className="">Enter USSD code:</div>
                  <input
                    
                    name="ussdCode"
                    value={formData.ussdCode}
                    onChange={handleChange}
                    className="required: w-[260px]  border-2 rounded border-black py-1 px-1"
                  />
                </div>
                <div className="p-1">
                  <div className="">Enter USSD URL:</div>
                  <input
                    name="ussdUrl"
                    value={formData.ussdUrl}
                    onChange={handleChange}
                    className="required: w-[260px] border-2 rounded border-black py-1 px-1"
                  />
                </div>
                <div className="p-1">
                  <div className="">Enter Phone Number:</div>
                  <input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="required: w-[260px] border-2 rounded border-black py-1 px-1"
                  />
                </div>
                <div className="p-1">
                  <div className="">Enter Network Name:</div>
                  <input
                    name="networkName"
                    value={formData.networkName}
                    onChange={handleChange}
                    className="required: w-[260px] border-2 rounded border-black py-1 px-1"
                  />
                </div>
                <div className=" flex justify-between w-full items-center text-center p-3">
                  <button
                    
                    className="items-center border-solid bg-blue-400 text-white h-[50px] w-[80px] rounded hover:bg-blue-800"
                    type="submit"
                  >
                    Update
                  </button>
                  <button
                   
                    className="items-center border-solid bg-blue-400 text-white h-[50px] w-[80px] rounded hover:bg-blue-800"
                    onClick={() => setUpdateMode(false)}
                  >
                    Cancel
                  </button>
                </div>
               
              </form>
            )}
          </div>
        </div>
        <div className="w-[500px] h-[500px] border-[3px] flex flex-col items-center">
          <div className="p-3 font-bold text-xl">My USSD Codes</div>
          <div className="p-2 w-full grid grid-cols-2 gap-y-2 gap-x-2">
            {storedData && storedData.length > 0 ? (
              storedData.map((data, index) => (
                <div
                  key={index}
                  className=" bg-slate-500 flex flex-col w-auto p-2 rounded text-white "
                >
                  <div className="flex pb-1">
                    <ul className="flex p-1">
                      <li>USSD code: {data.ussdCode}</li>
                      {/* <li>Code URL: {storedData.ussdUrl}</li>
                            <li>Phone Number: {storedData.phoneNumber}</li>
                            <li>Network: {storedData.networkName}</li> */}
                    </ul>
                  </div>
                  <div className="w-auto flex justify-between p-1">
                    <button
                      onClick={() => toggleUpdateMode(data.id)}
                      className="items-center border-solid bg-blue-400 text-white h-[30px] w-[40px] rounded hover:bg-blue-800"
                    >
                      Edit
                    </button>
                    <button className="items-center border-solid bg-blue-400 text-white h-[30px] w-[40px] rounded hover:bg-blue-800">
                      Test
                    </button>
                    <button
                      className="items-center border-solid bg-blue-400 text-white h-[30px] w-[60px] rounded hover:bg-blue-800"
                      onClick={() => handleDelete(data.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-auto flex text-center items-center">
                <p>No codes stored yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
