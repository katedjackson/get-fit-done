import React, { Component, PropTypes } from 'react';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected
    };
    this.handleClick = this.handleClick.bind(this);
    this._renderTitles = this._renderTitles.bind(this);
    this._renderContent = this._renderContent.bind(this);
  }

  handleClick(index, event) {
    event.preventDefault();
    this.setState({
      selected: index
    });
  }

  _renderTitles() {
    function labels(child, index) {
      let activeClass = (this.state.selected === index ? 'active' : '');
      return (
        <div key={index} className="tab_button">
          <li>
            <a href="#"
              className={activeClass}
              onClick={this.handleClick.bind(this, index)}>
              {child.props.label}
            </a>
          </li>
        </div>
      );
    }
    return (
      <ul className="tabs_labels">
        {this.props.children.map(labels.bind(this))}
      </ul>
    );
  }

  _renderContent() {
    return (
      <div className="tabs_content">
        {this.props.children[this.state.selected]}
      </div>
    );
  }

  render() {
    return (
      <div className="tabs">
        {this._renderTitles()}
        {this._renderContent()}
      </div>
    );
  }
}
Tabs.propTypes = {
  selected: PropTypes.number
}

export default Tabs;
