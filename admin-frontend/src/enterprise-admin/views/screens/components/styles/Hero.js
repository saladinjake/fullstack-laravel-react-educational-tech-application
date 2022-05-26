import styled from "styled-components";
import { fonts } from "../common/element/elements.js";

export const Styles = styled.div`
  .hero-area {
    background: linear-gradient(
      180deg,
      rgba(2, 83, 200, 0.03) 0%,
      rgba(2, 83, 200, 0) 100%
    );
    padding: 104px;
    display: flex;
    justify-content: space-between;

    &__right {
      flex-basis: 30%;
      position: relative;

      figure {
        width: 100%;
        border-radius: 16px;
        overflow: hidden;

        img.icon {
          position: absolute;
          width: 3rem;
          height: 3rem;
          left: 0;
          bottom: 0;
        }

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    &__left {
      flex-basis: 65%;
      padding-top: 4rem;
      padding-top: 2rem;
      padding-right: 8rem;

      h2 {
        font-family: ${fonts.roboto};
        font-style: normal;
        font-weight: bold;
        font-size: 56px;
        line-height: 60px;
        color: #01265b;

        span {
          color: #de863e;
        }
      }

      p {
        font-family: ${fonts.poppins};
        font-style: normal;
        font-weight: normal;
        font-weight: 300;

        font-size: 20px;
        line-height: 24px;
        color: #30415a;
        padding-top: 40px;
        padding-bottom: 40px;
      }

      .cta {
        display: flex;

        button {
          width: 185px;
          height: 56px;
          background: #0253c8;
          border-radius: 4px;
          outline: none;
          border: none;

          font-family: ${fonts.roboto};
          font-style: normal;
          font-weight: normal;
          font-size: 20px;
          line-height: 24px;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;

          &:hover {
            color: #0253c8;
            background: linear-gradient(
              180deg,
              rgba(2, 83, 200, 0.03) 0%,
              rgba(2, 83, 200, 0) 100%
            );
            border: 1px solid #0253c8;
          }

          &.outline {
            color: #0253c8;
            background: linear-gradient(
              180deg,
              rgba(2, 83, 200, 0.03) 0%,
              rgba(2, 83, 200, 0) 100%
            );
            border: 1px solid #0253c8;
            margin-left: 24px;

            &:hover {
              background: rgba(2, 83, 200, 0.9);
              color: #ffffff;
            }
          }
        }
      }
    }
  }
`;
