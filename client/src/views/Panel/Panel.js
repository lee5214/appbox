import React, { Component } from "react";
import Graph3D from "./Graph3D";
import GraphCircle from "./GraphCircle";
import styles from "./Panel.scss";

export default class Panel extends Component {
  render() {
    return (
      <div className={"animated fadeIn container d-flex"}>
        <div className={styles.slogan}>
          <pre style={{ color: "#51ff71" }}>
            {"while(alive){\n"}
            {"  eat();"}
            <pre style={{ color: "gray",marginBottom:0 }}>
              {"  //sleep();\n"}
              {"  //code();"}
            </pre>
            {"  this.coffee? code(): sleep();\n"}
            {"}"}
          </pre>

        </div>
        <GraphCircle roZ={this.props.roZ} />
        <Graph3D />
      </div>
    );
  }
}
