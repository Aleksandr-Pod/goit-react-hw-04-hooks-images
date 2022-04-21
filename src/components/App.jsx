import { useState, useEffect } from 'react';
import "./styles.css";
import Searchbar from './SearchBar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export function App() {
  const PERPAGE = 12;
  const [searchName, setSearchName] = useState("");
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentImg, setCurrentImg] = useState({});
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!searchName) return;
    console.log("useEffect");
    const URL = "https://pixabay.com/api/";
    const KEY = "25089539-92235f01f3468a6ac8c56a646";
    setIsLoading(true);
    const doFetch = (() => {
      fetch(`${URL}?q=${searchName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${PERPAGE}`)
        .then(resp => resp.json())
        .then(gallery => {
          if (gallery.hits.length === 0) {
            return Promise.reject(new Error("поиск не дал результата"))
          }
          handleResponse(gallery);
        })
        .catch(err => setErr(err))
    });
    doFetch()
  }, [page, searchName])

  const handleResponse = (gallery) => {
    gallery.length === 0 ? setGallery(gallery.hits) : setGallery(prev => [...prev, ...gallery.hits]);
    setTotalItems(gallery.totalHits);
    setIsLoading(false);
    setErr(null);
  }

  const onSubmit = (evt) => {
    evt.preventDefault();
    setSearchName(evt.target.elements.searchName.value.trim().toLowerCase());
    setPage(1);
    setGallery([]);
  }
  const loadMore = () => setPage(page => page + 1)

  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) toggleModal({})
  }

  const toggleModal = (img) => {
    setShowModal(!showModal);
    setCurrentImg(img)
  }
  const handleEsc = (evt) => {
    if (evt.code === 'Escape') toggleModal({})
  }

  return (
    <div>
      <Searchbar onSubmit={onSubmit} />
      {err && <p className="error">Ошибка, {err.message}</p>}
      {gallery.length !== 0 &&
        <ImageGallery
          gallery={gallery}
          page={page}
          perPage={PERPAGE}
          totalItems={totalItems}
          loadMore={loadMore}
          isLoading={isLoading}
          showModal={toggleModal} />
      }
      <Loader loading={isLoading} />
      {showModal && <Modal handleOverlayClick={handleOverlayClick} onEsc={handleEsc} currentImg={currentImg} />}
    </div>
  );
}