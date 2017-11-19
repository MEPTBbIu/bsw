import "./promopage.scss";
import React from "react";
const PromoPage = ({ wakeupApp }) => {
    return (React.createElement("div", { className: "bs-promo root", onTouchStart: wakeupApp },
        React.createElement("div", { className: "logo" },
            React.createElement("img", { src: "./assets/images/big-black-logo.png", alt: "" })),
        React.createElement("div", { className: "mid-text" },
            React.createElement("img", { src: "./assets/images/slogan-mid.png", alt: "" })),
        React.createElement("div", { className: "bottom-text" },
            React.createElement("img", { src: "./assets/images/slogan-bottom.png", alt: "" })),
        React.createElement("div", { className: "press-to-start" },
            React.createElement("p", { id: "p2s" },
                React.createElement("span", null, "\u041A\u043E\u0441\u043D\u0438\u0442\u0435\u0441\u044C \u044D\u043A\u0440\u0430\u043D\u0430 \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C")))));
};
export default PromoPage;
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/src/components/PromoPage/promopage.js.map