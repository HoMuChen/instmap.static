import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    maxWidth: 360,
    maxHeight: '100vh',
    backgroundColor: '#fff',
    //boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
    //textTransform: 'uppercase',
    //outline: 'none',
    overflowY: 'scroll'
  }
});

class ControlPlane extends Component {
  constructor() {
    super();
    this.ref = React.createRef();
  }

  componentDidMount() {
    if (this.ref) {
      this.ref.current.addEventListener("scroll", this.handleOnScroll);
    }
  }

  componentWillUnmount() {
    if (this.ref) {
      this.ref.current.removeEventListener("scroll", this.handleOnScroll);
    }
  }

  handleOnScroll = () => {
    const scrollTop =
      (this.ref && this.ref.current.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (this.ref && this.ref.current.scrollHeight) ||
      document.body.scrollHeight;
    const clientHeight =
      this.ref.current.clientHeight || window.innerHeight;
    const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom && !this.props.isLoading) {
      this.props.onLoadMore();
    }
  };

  handleOnHover = (id) => () => {
    this.props.locationOnHover(id)
  }

  handleSelectLocation = (loc) => () => {
    this.props.selectLocation(loc)
  }

  render() {
    const {
      classes,
      locations,
    } = this.props;

    return (
      <List className={classes.root} ref={this.ref}>
        {
          locations.map(loc => (
            <div
              onMouseEnter={this.handleOnHover(loc.id)}
            >
              <ListItem
                key={loc.id}
                alignItems="flex-start"
                button
                onClick={this.handleSelectLocation(loc)}
              >
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={loc.imageUrl} />
                </ListItemAvatar>
                <ListItemText
                  primary={loc.name}
                  secondary={`貼文數: ${loc.mediaCount}`}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          ))
        }
      </List>
    );
  }
}

export default withStyles(styles)(ControlPlane);
