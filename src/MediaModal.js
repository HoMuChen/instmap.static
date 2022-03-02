import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


class MediaModal extends Component {
  render() {
    const {
      open,
      loc,
      medias,
      onClose,
    } = this.props;

    return (
      <Dialog
        open={open}
        onClose={onClose}
      >
        <DialogTitle>
          <a
            style={{ color: '#000', textDecoration: 'none' }}
            target='_blank'
            href={`https://www.instagram.com/explore/locations/${loc.id}`}
          >
            {loc.name}
          </a>
        </DialogTitle>
        <DialogContent dividers>
          <GridList cols={3}>
            {
              medias.map(media => (
                <GridListTile key={media.id}>
                  <a
                    target='_blank'
                    href={media.url}
                  >
                  <img
                    alt='Not Found'
                    style={{ top: '50%', width: '100%', position: 'relative', transform: 'translateY(-50%)' }}
                    src={`https://storage.googleapis.com/homuchen.com/ig/${media.id}.jpg`}
                  />
                  </a>
                </GridListTile>
              ))
            }
          </GridList>
        </DialogContent>
      </Dialog>
    );
  }
}

MediaModal.defaultProps = {
  open:   false,
  loc:    { name: '' },
  medias: [],
}

MediaModal.propsTypes = {
  open:    PropTypes.bool.isRequired,
  loc:     PropTypes.object.isRequired,
  medias:  PropTypes.array.isRequired,
}

export default MediaModal;
