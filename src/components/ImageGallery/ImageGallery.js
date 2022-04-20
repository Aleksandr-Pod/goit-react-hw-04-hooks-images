import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Button from '../Button/Button';
import PropTypes from 'prop-types';

export default function ImageGallery({ gallery, page, isLoading, totalItems, loadMore, showModal } ) {
    const theRest = (totalItems - page * 12);
    return (
        <>
            <ul className="ImageGallery"> 
            {gallery.map(item => (
                <ImageGalleryItem
                    key={item.id}
                    item={item}
                    onClick={showModal} />
            ))}
        </ul>
            {theRest > 0 && !isLoading && <Button loadMore={loadMore}/>}
        </>
    )
}
ImageGallery.propTypes = {
    gallery: PropTypes.array,
    page: PropTypes.number,
    totalItems: PropTypes.number,
    loadMore: PropTypes.func,
    isLoading: PropTypes.bool,
    showModal: PropTypes.func
}