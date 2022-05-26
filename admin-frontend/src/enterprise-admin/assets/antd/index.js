import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Tabs } from "antd";
import "./index.scss";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";
import {
  getServiceCharge,
  updateServiceCharge,
} from "../../../API/Admin/service";
import { useToastContext, ADD } from "../../../context/ToastContext";
import Input from "../../../components/Input";

const { TabPane } = Tabs;

function callback(key) {
  // console.log(key);
}

const MealView = () => {
  const { toastDispatch } = useToastContext();
  const [charge, setCharge] = useState(0);
  const { handleSubmit, register, errors } = useForm();

  useEffect(() => {
    fetchCharge();
  }, []);

  const fetchCharge = () => {
    getServiceCharge()
      .then((res) => {
        setCharge(res.value);
      })
      .catch((err) => {
        toastDispatch({
          type: ADD,
          payload: {
            content: {
              msg:
                (err &&
                  err.response &&
                  err.response.data &&
                  err.response.data) ||
                "Erroc occured fetching Service Charge",
              type: "error",
            },
          },
        });
      });
  };

  const showServiceModal = () => {
    const serviceModal = document.querySelector(".serviceModal");
    serviceModal.classList.toggle("show");
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    e.target[1].disabled = true;
    updateServiceCharge(data)
      .then((res) => {
        document.querySelector(".serviceModal").classList.toggle("show");
        toastDispatch({
          type: ADD,
          payload: {
            content: {
              msg: `Service Charge Updated to ${res.value}`,
              type: "info",
            },
          },
        });
      })
      .catch((err) => {
        document.querySelector(".serviceModal").classList.toggle("show");
        toastDispatch({
          type: ADD,
          payload: {
            content: {
              msg:
                (err &&
                  err.response &&
                  err.response.data &&
                  err.response.data) ||
                "Error occured updating charge",
              type: "error",
            },
          },
        });
      });
    e.target[1].disabled = false;
  };

  return (
    <div className="mealView">
      <section className="serviceModal">
        <button className="closeModal" onClick={showServiceModal}>
          Close
        </button>
        <div className="serviceModal__content">
          <h2>Add Service Charge</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input className="form-control"
                label="Enter Percentage (Less Than or equal to 1)"
                name="serviceCharge"
                id="serviceCharge"
                val={charge}
                register={register}
                errors={errors}
                type="number"
                minVal="0"
                maxVal="1"
                require={true}
              />
            </div>

            <button className="accept">Save Charge</button>
          </form>
        </div>
      </section>
      <div className="row">
        <h2>Meal</h2>
        {/* <button onClick={showServiceModal} className="service">Service Charge</button> */}
      </div>
      <div>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="New meals" key="1">
            <Tab1 />
          </TabPane>
          <TabPane tab="Approved meals" key="2">
            <Tab2 />
          </TabPane>
          <TabPane tab="Rejected meals" key="3">
            <Tab3 />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default MealView;
