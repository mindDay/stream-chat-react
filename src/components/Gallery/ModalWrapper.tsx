import type React from 'react';
// import Carousel, { Modal, ModalGateway, ViewType } from 'react-images';

// import { ModalImage } from './ModalImage';

/**
 * Small modal component
 */
export type ModalWrapperProps = {
  /** The images for the Carousel component */
  // images: ViewType[];
  /** Boolean for if modal is open*/
  modalIsOpen: boolean;
  /** click event handler for toggling modal */
  toggleModal: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  /** The index for the component */
  index?: number;
};

export const ModalComponent: React.FC<ModalWrapperProps> = () =>
  // const { images, index, modalIsOpen, toggleModal } = props;

  null;
// return (
//   <ModalGateway>
//     {modalIsOpen ? (
//       <Modal onClose={toggleModal}>
//         <Carousel
//           components={{
//             // @ts-expect-error
//             View: ModalImage,
//           }}
//           currentIndex={index}
//           views={images}
//         />
//       </Modal>
//     ) : null}
//   </ModalGateway>
// );
