import React from "react";

import './style.css';

interface IOwnProps {
  show: boolean;
  header: JSX.Element | string;
  body: JSX.Element | string;
  footer?: JSX.Element | string;
  onClose: () => void;
}

interface IOwnState {}

export default class extends React.Component<IOwnProps, IOwnState> {
  render() {
    return (
      <div className={`modal ${this.props.show ? "show" : "fade"}`}>
        <div className="modal-backdrop" />
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">{this.props.header}</div>
            <button onClick={this.props.onClose}>
              <span>x</span>
            </button>
          </div>
          <div className="modal-body">{this.props.body}</div>
          {this.props.footer && (
            <div className="modal-footer">{this.props.footer}</div>
          )}
        </div>
      </div>
    );
  }
}
