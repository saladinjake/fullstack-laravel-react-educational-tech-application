import styled from "styled-components";
import { colors } from "../../../../components/common/element/elements.js";

export const Styles = styled.div`
  // Form
  form.form {
    p.form-control {
      padding: 0;
      width: auto;
      height: auto;
      background: transparent;
      border: none;
      margin-bottom: 28px;
      position: relative;
      display: flex;
      flex-direction: column;

      label {
        font-size: 15px;
        color: ${colors.text1};
        font-weight: 500;

        i {
          font-size: 10px;
          color: ${colors.text3};
        }

        @media (max-width: 575px) {
          font-size: 14px;
        }
      }

      input,textarea {
        width: 100%;
        height: 48px;
        background-color: #ffffff;
        font-size: 14px;
        padding: 15px 20px;
        color: ${colors.black1};
        border: 1px solid ${colors.border3};
        border-radius: 5px;

        &::placeholder {
          font-size: 14px;
          font-style: italic;
          color: ${colors.text3};

          @media (max-width: 575px) {
            font-size: 13px;
          }
        }

        &:focus {
          border-color: ${colors.green};
        }

        @media (max-width: 575px) {
          height: 40px;
        }
      }

      select {
        background: transparent;
        border: none;
        border: 1px solid ${colors.border3};
        outline: none;
        cursor: pointer;
        width: 100%;
        padding: 10px;
        width: 100%;
        height: auto;
        display: inline-block;

        &:-moz-focusring {
          color: transparent;
          text-shadow: 0 0 0 #000;
        }

        &:-webkit-focusring {
          color: transparent;
          text-shadow: 0 0 0 #000;
        }

        option {
          padding: 1rem;
          background-color: transparent;
          cursor: pointer;
        }
      }

      span {
        color: ${colors.red};
        font-weight: 300;
        position: absolute;
        bottom: -20px;
        left: 0;
        visibility: visible;
      }
    }
  }
  // Table
  table {
    td {
      padding: 5px 10px;
    }

    td.center {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  // Tabs
  .course-tab-list {
    // background-color: red;

    padding-top: 20px;

    .nav {
      display: inline-block;
      border-radius: 5px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      margin-bottom: 35px;
      .nav-item {
        display: inline-block;
        a.nav-link {
          font-size: 14px;
          color: ${colors.black2};
          font-weight: 500;
          text-transform: uppercase;
          padding: 12px 30px 10px;
          border-radius: 5px;

          @media (max-width: 991px) {
            padding: 12px 16px 9px;
          }
        }
        a.nav-link.active {
          background: ${colors.gr_bg2};
          color: #ffffff;
        }
      }
    }
  }

  // Tabs

  .product-page {
    background: #f4f8fc;

    .sec-title {
      h4 {
        color: ${colors.black1};
        line-height: 35px;
        font-weight: 600;
        max-width: 550px;
        margin: auto;
        margin-top: 5px;
        margin-bottom: 5px;

        @media (max-width: 575px) {
          margin-bottom: 15px;
          font-size: 20px;
        }
      }
    }
    //   Course area

    .filter-items {
      margin-right: 0;
      margin-left: 0;

      .course-item {
        transition: all 0.2s ease;
        margin-bottom: 30px;
        background: #ffffff;
        box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.05),
          0px 0px 1px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        min-height: 450px;

        .course-image {
          width: 100%;
          height: 220px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border-radius: 5px 5px 0 0;
          position: relative;

          .author-img {
            position: absolute;
            left: 20px;
            bottom: 20px;

            img {
              max-width: 40px;
              border-radius: 50%;
              margin-right: 5px;
            }

            .title {
              background: #ffffff;
              padding: 3px 8px;
              border-radius: 5px;

              p {
                font-size: 12px;
                color: ${colors.black1};
                font-weight: 500;
                margin-bottom: -4px;
              }

              span {
                font-size: 11px;
                color: ${colors.text3};
                font-weight: 500;
              }
            }
          }

          .course-price {
            p {
              font-size: 16px;
              color: #ffffff;
              background: ${colors.bg1};
              position: absolute;
              right: 20px;
              bottom: 20px;
              padding: 8px 10px;
              font-weight: 500;
              border-radius: 5px;
            }
          }
        }

        .course-content {
          background: #fff;
          padding: 20px 25px;
          border-radius: 0 0 5px 5px;

          h6.heading {
            a {
              color: ${colors.black1};
              font-weight: 600;
              display: inline-block;
              margin-bottom: 12px;

              &:hover {
                color: ${colors.green};
              }
            }
          }

          p.author {
            font-size: 14px;
            color: ${colors.text3};
            line-height: 16px;
            padding-bottom: 10px;
            margin-bottom: 5px;
          }

          p.desc {
            font-size: 14px;
            color: ${colors.text3};
            line-height: 25px;
            border-bottom: 1px solid ${colors.border1};
            padding-bottom: 10px;
            margin-bottom: 12px;
          }

          .course-face {
            .duration,
            .student {
              p {
                font-family: Sequel Sans;
                font-style: normal;
                font-weight: normal;
                font-size: 13px;
                color: ${colors.text3};
                font-size: 20px;
                line-height: 16px;
                color: #01265b;

                i {
                  font-size: 16px;
                  color: ${colors.green};
                  vertical-align: text-bottom;
                  margin-right: 3px;
                }
              }
            }

            .rating {
              ul {
                li {
                  margin-right: 0;

                  i {
                    font-size: 14px;
                    color: ${colors.yellow};
                  }

                  &:last-child {
                    font-size: 13px;
                    color: ${colors.text3};
                  }
                }
              }
            }
          }
        }

        &:hover {
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.07);
        }
      }
    }
    // Course Area End

    // Producta Area start

    .product-area {
      padding: 70px 0;
      .product-box {
        border: 1px solid ${colors.border1};
        border-radius: 5px;
        transition: all 0.2s ease;
        margin-bottom: 30px;
        .product-img {
          position: relative;
          overflow: hidden;
          img {
            transform: scale(1);
            transition: 0.3s ease;
          }
          span {
            position: absolute;
            content: "";
            background: ${colors.gr_bg};
            width: 55px;
            height: 55px;
            text-align: center;
            left: 15px;
            top: 15px;
            font-size: 18px;
            color: #fff;
            font-weight: 600;
            padding-top: 15px;
            border-radius: 50%;
          }
          .layer-box {
            position: absolute;
            background: rgba(255, 255, 255, 0.8);
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            visibility: hidden;
            opacity: 0;
            z-index: -1;
            transition: 0.3s ease;
          }
          a.add_cart {
            position: absolute;
            font-size: 15px;
            top: 33%;
            left: 100%;
            z-index: 1;
            background: transparent;
            border: 2px solid ${colors.green};
            font-size: 13px;
            color: ${colors.green};
            font-weight: 600;
            text-transform: uppercase;
            width: 120px;
            height: 38px;
            border-radius: 5px;
            padding-top: 8px;
            text-align: center;
            transition: 0.2s ease;
            &:hover {
              background: ${colors.gr_bg};
              color: #ffffff;
            }

            @media (max-width: 1199px) {
              top: 30%;
            }

            @media (max-width: 767px) {
              top: 35%;
            }
          }
          a.item_view {
            position: absolute;
            font-size: 15px;
            bottom: 33%;
            right: 100%;
            z-index: 1;
            background: transparent;
            border: 2px solid ${colors.black1};
            font-size: 13px;
            color: ${colors.black1};
            font-weight: 600;
            text-transform: uppercase;
            width: 120px;
            height: 38px;
            border-radius: 5px;
            padding-top: 8px;
            text-align: center;
            transition: 0.2s ease;
            &:hover {
              background: ${colors.black1};
              color: #ffffff;
            }

            @media (max-width: 1199px) {
              bottom: 30%;
            }

            @media (max-width: 767px) {
              bottom: 35%;
            }
          }
          &:hover {
            img {
              transform: scale(1.1);
            }
            .layer-box {
              visibility: visible;
              z-index: 1;
              opacity: 1;
            }
            a.add_cart {
              left: 35%;
              margin-left: -22px;

              @media (max-width: 1199px) {
                left: 32%;
                margin-left: -22px;
              }

              @media (max-width: 767px) {
                left: 50%;
                margin-left: -60px;
              }
            }
            a.item_view {
              right: 35%;
              margin-right: -22px;

              @media (max-width: 1199px) {
                right: 32%;
                margin-right: -24px;
              }

              @media (max-width: 767px) {
                right: 50%;
                margin-right: -60px;
              }
            }
          }
        }

        .product-content {
          padding: 15px 0;
          .pro-title {
            margin-bottom: 6px;
            h5 {
              a {
                color: ${colors.black1};
                font-weight: 600;
                &:hover {
                  color: ${colors.green};
                }
              }
            }
          }
          .pro-rating {
            margin-bottom: 6px;
            ul {
              li {
                margin-right: 1px;
                i {
                  font-size: 15px;
                  color: ${colors.yellow};
                }
                &:last-child {
                  margin-right: 0;
                }
              }
            }
          }

          .pro-price {
            p {
              font-size: 16px;
              color: ${colors.green};
              font-weight: 500;
            }
          }
        }

        &:hover {
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.07);
        }
      }

      @media (max-width: 767px) {
        padding: 35px 0 30px;
      }

      @media (max-width: 575px) {
        padding-bottom: 0;
      }
    }
  }

  .course-filter {
    background: #f4f8fc;
    padding: 62px 0 70px;

    .sec-title {
      h4 {
        color: ${colors.black1};
        line-height: 35px;
        font-weight: 600;
        max-width: 550px;
        margin: auto;
        margin-bottom: 42px;

        @media (max-width: 575px) {
          margin-bottom: 15px;
          font-size: 20px;
        }
      }
    }

    //    producta Are end
  }
`;
