import styled from "styled-components";
import { colors } from "../../../../components/common/element/elements.js";

/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: style definition for checkout page

*/

export const Styles = styled.div`
  .about-page {
    padding: 70px 0 65px;

    .checkout {
        margin-top:20px;
        margin-bottom:40px;
    }

    h4.tab-title {
      color: ${colors.black1};
      font-weight: 600;
      margin-bottom: 25px;

      @media (max-width: 575px) {
        margin-bottom: 15px;
        font-size: 20px;
      }
    }

    p.tab-desc {
      font-size: 15px;
      color: ${colors.text2};
      line-height: 30px;
      margin-bottom: 25px;

      @media (max-width: 575px) {
        font-size: 14px;
      }
    }

    ul.check-list {
      li {
        font-size: 15px;
        color: ${colors.text3};
        margin-bottom: 20px;
        line-height: 25px;

        i {
          float: left;
          color: ${colors.green};
          border: 1px solid ${colors.border3};
          width: 35px;
          height: 35px;
          border-radius: 50%;
          text-align: center;
          padding-top: 9px;
          margin-right: 15px;
        }

        &:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 575px) {
          font-size: 14px;
        }
      }
    }

    .icon-box-area {
      padding-bottom: 72px;
      .full-icon-box {
        .icon-box {
          position: inherit;
          top: 0;
          left: 0;
          width: unset;
        }
      }

      @media (max-width: 767px) {
        padding: 0 0 10px;
      }
    }
  }
`;
