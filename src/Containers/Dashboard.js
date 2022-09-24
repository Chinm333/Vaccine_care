import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { Line } from 'react-chartjs-2';

import React, { useEffect, useState, PureComponent } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter, Redirect } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Badge,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import SelectUserType from "../Components/UserType";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import SearchIcon from "@material-ui/icons/Search";
import moment from "moment";
import { isMobile } from "react-device-detect";
import StyledTable from "../Components/UI/Table/Table";
import firebase from "../firebaseHandler";
import { Send } from "@material-ui/icons";
import { render } from '@testing-library/react';
const db = firebase.database();
const data1 = [];
let dates = [];
let times = [];
let temps = [];
const chinm = [];
const Dashboard = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);
  const loggedin = useSelector((state) => state.auth.loggedin);
  const [data, setData] = useState([]);

  const getFirebaseData = async () => {
    // db.collection("sensor_data")
    //   .get()
    //   .then((querySnapshot) => {
    //     let arr = [];
    //     querySnapshot.forEach((doc) => {
    //       arr.push(doc.data());
    //     });
    //     setData(arr);
    //   });
    const dbRef = db.ref();
    // let dates = []
    // let times = []
    // let temps = []

    // obj -> temp, time, date
    // obj[0] -> get first
    await dbRef
      .child("t/tempC")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          let obj = snapshot.val();

          Object.keys(obj).forEach((key) => {
            temps.push(
              obj[key])
            // Date: obj[key.Date],
            // Time: obj[key.Time],
          });

          //   console.log(arr[arr.length - 1].Temperature);
          //   if (arr[arr.length - 1].Temperature >= 32) {
          //     // sendTextMessage();
          //   }
          // };
        } else {
          console.log("No data available");
        }


      });
    await dbRef
      .child("t/Time")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          let obj = snapshot.val();
          //console.log(JSON.stringify(obj));

          //console.log(abc);

          Object.keys(obj).forEach((key) => {
            times.push(
              // Temperature: obj[key],
              // Date: obj[key.Date],
              obj[key]
            );

          });

        } else {
          console.log("No data available");
        }

      });

    await dbRef
      .child("t/Date")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          let obj = snapshot.val();
          // dates=Object.entries(obj)
          //dates= Object.keys(obj).map((key) => [ //local hooi asse
          // key,obj[key]
          //]);
          Object.keys(obj).forEach((key) => {
            dates.push(

              // Temperature: obj[key],
              // Date: obj[key.Date],
              obj[key]
            );
          });
          // console.log(dates);
          // setData(arr.reverse());
        } else {
          console.log("No data available");
        }

      });

    // modifications
    // const data1 = [];
    for (let i = 0; i < temps.length; i++) {
      const obj = { date: dates[i], time: times[i], temperature: temps[i] };
      data1.push(obj);
      chinm.push(obj);
    }

    data1.reverse();
    // console.log(data1[0]);
    setData(data1);
  };
  // try
  // console.log(chinm);




  //Runs when page is loaded
  useEffect(() => {
    getFirebaseData();
  }, []);

  useEffect(() => {
    if (!loggedin) {
      props.history.push("/");
    }
  }, [loggedin]);

  if (user) {
    return (
      <div
        style={{
          width: isMobile ? "90%" : "80%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 20,
        }}
      >
        <div style={{}}>
          <Card
            elevation={4}
            style={{
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 50,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Typography
              variant="h6"
              component="h4"
              style={{ marginBottom: 20 }}
            >
              Welcome, {user.displayName}
            </Typography>
          </Card>

          {data && data.length > 0 && (
            <Card
              elevation={4}
              style={{
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: 50,
                padding: 10,
                borderRadius: 10,
              }}
            >
              <StyledTable
                headers={
                  data && data.length > 0
                    ? ["Sno", ...Object.keys(data[0])]
                    : []
                }
                data={data && data.length > 0 ? data : []}
                defaultPageSize={10}
                mapping={{}}
                rowClickable={false}
                Stickycolumn={[]}
              />
            </Card>
          )}
          <Card>
            <ResponsiveContainer width="100%" aspect={3}>
              <LineChart data={chinm} width={500} height={300} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" interval={'preserveStartEnd'} tickFormatter={(value) => value} />
                <YAxis dataKey="temperature" interval={'preserveStartEnd'} tickFormatter={(value) => value} />
                <Tooltip contentStyle={{ backgroundColor: 'yellow' }} />
                <Legend />
                <Line type="monotone" dataKey="temperature" stroke="red" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="time" stroke="green" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

        </div>
      </div>


    );
  } else {
    return <Redirect to="/" />;
  }

};




export default withRouter(Dashboard);

