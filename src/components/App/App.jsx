import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import s from 'components/Styles.module.css';
import Button from 'components/Button/Button';
import pixabayApi from 'components/Api/Api';

import Modal from 'components/Modal/Modal';
import Spinner from 'components/Loader/Spinner';


export default function App() {
  const [query, setQuery] = useState([]);
  const [status, setStatus] = useState('idle');
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [modalImg, setModalImg] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (query.trim() === '') {
      return;
    }

    setStatus('pending');

      pixabayApi
        .fetchQuery(query, page)
        .then(({ hits }) => {
          const images = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
            return { id, webformatURL, largeImageURL, tags };
          });
          // console.log(images);
          if (images.length > 0) {
            setQuery(state => [...state, ...images]);
          setStatus('resolved');
          } else {
            alert(`По запросу ${query} ничего не найдено.`);
            this.setState({ status: 'idle' });
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleSubmitInput = newQuery => {
    if (newQuery !== this.state.name) {
      this.setState({ name: newQuery, page: 1, status: 'pending' });
    }
  };

  handleClickImg = event => {
    const imgForModal = event.target.dataset.src;
    const altForModal = event.target.alt;
    this.setState({
      showModal: true,
      modalImg: imgForModal,
      modalAlt: altForModal,
    });
  };

  handleClickBtn = () => {
    this.setState(({ page }) => {
      return { page: page + 1, status: 'pending' };
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { query, showModal, modalImg, modalAlt, error, status } = this.state;

    if (status === 'idle') {
      return (
        <div>
          <Searchbar onSubmit={this.handleSubmitInput} />
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      );
    }

    if (status === 'pending') {
      // console.log('pending', this.state.query);
      return (
        <div>
          <Searchbar onSubmit={this.handleSubmitInput} />
          {query.length > 0 && <ImageGallery query={query} />}
          <Spinner className={s.Loader} />
        </div>
      );
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolved') {
      // console.log('resolved', this.state.query);
      return (
        <>
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={modalImg} alt={modalAlt} />
            </Modal>
          )}
          <div>
            <Searchbar onSubmit={this.handleSubmitInput} />
            <ImageGallery onClickImg={this.handleClickImg} query={this.state.query} />
            <Button handleClickBtn={this.handleClickBtn} />
          </div>
        </>
      );
    }
  }
}
