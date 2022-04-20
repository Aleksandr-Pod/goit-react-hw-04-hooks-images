import PropTypes from 'prop-types';

export default function ImageGalleryItem({ item, onClick }) { 
    return (
        <li className="ImageGalleryItem" onClick={() => onClick(item) }> 
            <img className="ImageGalleryItem-image" src={item.webformatURL} alt="" />
        </li>
    )
}

ImageGalleryItem.propTypes = {
    item: PropTypes.object,
    onClick: PropTypes.func
}