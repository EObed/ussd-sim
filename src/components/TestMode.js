import React, { useState } from "react";




const TestMode = ({ cancelCallbackFunc, sendDataFunc, testFormData, randomNumber }) => {
  const [respMsg, setRespMsg] = useState("");
  
  const cancelClick = () => {
    cancelCallbackFunc();
  };

  const [userData, setUserData] = useState(testFormData.ussdCode);

  const handleInputChange = (event) => {
    setUserData(event.target.value);
  };

 

  const handleSendClick = () => {
   

    let messageType = true;

    const dataToBeTested = {
      USERID: "Spectrum",
      MSISDN: "233249621938",
      SESSIONID: randomNumber.toString(),
      NETWORK: "MTN",
      MSGTYPE: messageType,
      USERDATA: userData.toString(),
    };

    const jsonData = JSON.stringify(dataToBeTested);

    // console.log(messageType);
    // console.log(userData);
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
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setRespMsg("Error occurred while fetching data.");
      });

  
  };

  return (
    <div className="flex flex-col">
      <div className="w-[400px] h-[400px] border-[3px] p-2 flex items-center justify-between text-white">
        <p>{respMsg}</p>
      </div>
      <div className="flex flex-col p-4 w-auto justify-between">
        <div>
          {" "}
          <input
            value={userData}
            onChange={handleInputChange}
            className="border-2 border-black text-black p-1 w-[350px] "
          />{" "}
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
