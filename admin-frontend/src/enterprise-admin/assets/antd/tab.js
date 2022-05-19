import React, { useEffect, useState } from "react";
import { Table } from "antd";
import "./index.scss";
import option from "../icons/dots-horizontal.svg";
import { useToastContext, ADD } from "../../../context/ToastContext";
import Loader from "../../../components/Loader/Loader";
import { getMenusPI, updateMenuAPI } from "../../../API/Admin/meals";
import MealModal from './MealModal';



const Tab1 = () => {
  const [newMeals, setNewMeals] = useState([]);
  const { toastDispatch } = useToastContext();
  const [load, setLoad] = useState(false);

  const adminShowSubscriber = (id) => {
    let ctas =  Array.from(document.querySelectorAll(`.Subscribers__cta`));
    ctas.map( (container,index) => {
      if(container.childNodes[1].attributes[1].nodeValue === id) {
        container.childNodes[1].classList.toggle("adminSubscriberShow");
      }else {
        container.childNodes[1].classList.remove("adminSubscriberShow");
      }
    });
  };

  useEffect(() => {
     fetchMenus();
  }, []);

  const fetchMenus = () => {
     setLoad(true);
     getMenusPI("New")
      .then((res) => {
        setNewMeals([...res.menus]);
         setLoad(false);
      })
      .catch((err) => {
         toastDispatch({
          type: ADD,
          payload: {
            content: {
              msg: (err && err.response && err.response.data && err.response.data) ||
                   "Something went wrong, Please try again later",
              type: "error",
            },
          },
        });
        setLoad(false);
      });
  }

  const showMealModal = (id) => {
    let ctasCon =  Array.from(document.querySelectorAll(`.adminMealDetails`));
    ctasCon.map((container,index) => {
      if(container.attributes[1].nodeValue === id) {
        container.classList.add("show");
      }else {
        container.classList.remove("show");
      }
    });
  };

  const handleMealAction = (id, status) => {
    var elem = Array.from(document.querySelectorAll('.Subscribers__cta'));
    updateMenuAPI(id, { status: status })
      .then((res) => {
              elem.map((el) => {
                if(el.classList.contains(id)) { 
                    el.parentElement.previousElementSibling.innerText = res.status;
                }
              });
          toastDispatch({
            type: ADD,
            payload: {
              content: {
                msg: "Meal " + res.status,
                type: "info",
              },
            },
          });
      })
      .catch((err) => {
        toastDispatch({
          type: ADD,
          payload: {
            content: {
              msg: (err && err.response && err.response.data && err.response.data) ||
                   "Something went wrong, Please try again later",
              type: "error",
            },
          },
        });
      });
      adminShowSubscriber(id);
  };

  const data = [];
  for (let i = 0; i < newMeals.length; i++) {
    data.push({
      key: newMeals[i]._id,
      avatar: (
        <div className="Subscribers__avatar">
          <img
            src={
              process.env.REACT_APP_MENU_URL + newMeals[i].images.split(",")[0]
            }
            alt=""
          />
        </div>
      ),
      name: `${newMeals[i].name}`,
      chefname: `${newMeals[i].chef.name}`,
      price: `₦${newMeals[i].price}`,
      status: (
        <h4 className="activeStatus">{newMeals[i].status}</h4>
      ),
      action: (
        <div  className={`Subscribers__cta ${newMeals[i]._id}`}>
          <div
            className="Subscribers__options"
            onClick={() => adminShowSubscriber(newMeals[i]._id)}
          >
            <img src={option} alt="" style={{ width: "20px" }} />
          </div>
          
          <div className={`Subscribers__actions`} data-id={newMeals[i]._id}>
            <ul>
               <li onClick={ () => showMealModal(newMeals[i]._id) }>
                View Meal
              </li>
              <li onClick={() => handleMealAction(newMeals[i]._id, "Approved")}>
                Approve Meal
              </li>
              <li onClick={() => handleMealAction(newMeals[i]._id, "Rejected")}>
                Reject Meal
              </li>
            </ul>
          </div>

          <div className="adminMealDetails" data-id={newMeals[i]._id}>
              <MealModal
                    children={
                      <div className="Subscribers__modalInfo">
                        <h2>{newMeals[i].name}</h2>
                        <div className="Subscribers__modalImgs">
                          {newMeals[i].images.split(",").map((image, index) => (
                            <div className="Subscribers__modalAvatar">
                              <img
                                src={'https://content.largechops.com/menu/' + image}
                                alt=""
                              />
                            </div>
                          ))}
                        </div>

                        <div className="Subscribers__modalChef">
                          
                          <div className="Subscribers__modalDetails">
                            <div className="Subscribers__modalCehfAvatar">
                              <img
                                src={
                                  "https://content.largechops.com/profile/" +
                                  newMeals[i].chef.image
                                }
                                alt=""
                              />
                            </div>
                            <p>{newMeals[i].chef.name}</p>
                          </div>

                          <div>
                            <strong>#{newMeals[i].price}</strong>
                          </div>
                        </div>

                        <div className="Subscribers__modalBasic">
                          <div className="Subscribers__modalLeft">
                            <p className="Subscribers__modalSmallText">Description</p>
                            <p>{newMeals[i].description}</p>
                            {/* <p className="info">{ parseISOString(newMeals[i].createdAt) }</p> */}
                          </div>
                          <div className="Subscribers__modalRight">
                            <p className="Subscribers__modalSmallText">Category</p>
                            <p className="info">{newMeals[i].category}</p>
                          </div>
                        </div>
                      </div>
                    }
              />
          </div>

        </div>
      ),
    });
  }

  return (
    <div>
      <div>
      {
          load ? (
              <Loader width="50" />
            ) :
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 50 }}
            scroll={{ y: 500 }}
          />
       }
      </div>
    </div>
  );
};

export default Tab1;

const columns = [
  {
    title: "",
    dataIndex: "avatar",
    width: 50,
  },
  {
    title: "Menu Name",
    dataIndex: "name",
    width: 150,
  },
  {
    title: "Chef Name",
    dataIndex: "chefname",
    width: 150,
  },
  {
    title: "Price",
    dataIndex: "price",
    width: 150,
  },
  {
    title: "Status",
    dataIndex: "status",
    width: 150,
  },

  {
    title: "Action",
    dataIndex: "action",
    width: 100,
  },
];

