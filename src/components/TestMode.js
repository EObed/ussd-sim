import React, { useState } from "react";




const TestMode = ({ cancelCallbackFunc, sendDataFunc, testFormData, randomNumber }) => {
  const [respMsg, setRespMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false)
  
  const cancelClick = () => {
    cancelCallbackFunc();
  };

 
  const [userData, setUserData] = useState(testFormData.ussdCode);
  
  const handleInputChange = (event) => {
    setUserData(event.target.value);
  };

  const dialNum = testFormData.phoneNumber.toString()
  const dialNum1 =  dialNum.slice(1)
  const dialNum2 = "233"+dialNum1
  const handleSendClick = () => {
   
    setIsLoading(true)

    let messageType = true;

    const dataToBeTested = {
      USERID: "Spectrum",
      MSISDN: dialNum2,
      SESSIONID: randomNumber.toString(),
      NETWORK: testFormData.networkName.toString(),
      MSGTYPE: messageType,
      USERDATA: userData.toString(),
    };

    const jsonData = JSON.stringify(dataToBeTested);

    // console.log(messageType);
    console.log(userData);
    // console.log(randomNumber);

    const url = "https://test-nedco-mobile.bsl.com.gh/api/ussd/v1";

    let resp;
    fetch(url, {
      method: "POST",
      body: jsonData,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => (resp = response.json()))
      .then((resp) => {
        setRespMsg(resp.MSG); // Update the response in the state
        setUserData('')
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setRespMsg("Error occurred while fetching data.");
      }).finally(() => {
        setIsLoading(false); // Reset loading state whether the API call succeeds or fails
      });

  
  };

  return (
    <div className="flex flex-col">
      <div className="w-[400px] h-[400px] border-[3px] p-2 flex text-center items-center justify-between text-white">
        {isLoading &&   <div> USSD loading</div>}
        <p>{respMsg}</p>
      </div>
      <div className="flex flex-col p-4 w-auto justify-between">
        <div>
         
          <input
            value={userData}
            onChange={handleInputChange}
            className="border-2 border-black text-black p-1 w-[350px] "
          />
        </div>
        <div className="flex w-auto justify-between p-3">
          <button
            onClick={cancelClick}
            className="p-1 bg-blue-400 text-white h-[50px] w-[80px] rounded hover:bg-blue-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSendClick}
            className="p-1 bg-blue-400 text-white h-[50px] w-[80px] rounded hover:bg-blue-800"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestMode;
