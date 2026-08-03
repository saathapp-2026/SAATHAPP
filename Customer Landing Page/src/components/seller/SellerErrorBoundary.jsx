import React from 'react';
import SellerErrorPage from '../../pages/seller/errors/SellerErrorPage';

export default class SellerErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Seller portal error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <SellerErrorPage type="500" />;
    }
    return this.props.children;
  }
}
