import React, { Component } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  Grid,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components';
import { inject } from 'mobx-react';

const CardContainer = styled.div`
  margin-bottom: 20px;
`;

const CardTitle = styled.h1`
  margin: 8px 0;
  font-size: 22px;
`;

@inject('postsStore')
class Post extends Component {
  deletePost = () => {
    this.props.postsStore.deletePost(this.props.id);
  };

  handleStatusChange = (e) => {
    this.props.postsStore.updatePostStatus(
      this.props.id,
      e.target.value
    );
  };

  render() {
    const { title, description } = this.props;

    return (
      <CardContainer>
        <Card>
          <CardContent>
            <CardTitle>{title}</CardTitle>
            {description}
          </CardContent>
          <CardActions style={{ padding: '14px' }} disableSpacing>
            <Grid
              justify="space-between" // Add it here :)
              container
            >
              <Grid item>
                <FormControl style={{ width: '140px' }}>
                  <Select
                    value={this.props.status}
                    onChange={this.handleStatusChange}
                    displayEmpty
                  >
                    <MenuItem value={'ACTIVE'}>Active</MenuItem>
                    <MenuItem value={'DRAFT'}>Draft</MenuItem>
                    <MenuItem value={'CLOSED'}>Closed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item>
                <IconButton onClick={this.deletePost}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </CardContainer>
    );
  }
}

export default Post;
