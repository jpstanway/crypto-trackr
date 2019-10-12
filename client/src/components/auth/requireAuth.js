// import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
// import currentUserQuery from "../queries/CurrentUser";

// export default WrappedComponent => {
//   class requireAuth extends Component {
//     componentWillUpdate(nextProps) {
//       if (!nextProps.data.loading && !nextProps.data.user) {
//         this.props.history.push("/");
//       }
//     }

//     render() {
//       return <WrappedComponent {...this.props} />;
//     }
//   }

//   return withRouter(requireAuth);
// };
