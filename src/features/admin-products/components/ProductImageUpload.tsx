import React, { useRef, useState } from "react";
import { ProductImage, ProductImageReducerAction } from "../../../types";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { axiosInstance } from "../../../services/AxiosService";
import { previewImage, randomHash } from "../../../utils";
import { MAX_UPLOAD_IMAGES } from "../../../hooks/useManageProduct";
import { BACKEND_URL } from "../../../config";

type ManageProductImageProps = {
  images: ProductImage[];
  dispatchImages: React.Dispatch<ProductImageReducerAction>;
};

const ProductImageUpload = ({ images, dispatchImages }: ManageProductImageProps) => {
  const [dragActive, setDragActive] = useState(false);
  const inputFile = useRef<HTMLInputElement>(null);
  const imgList = useRef<HTMLDivElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadedFiles(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleUploadedFiles(e.target.files);
    }
  };

  const handleUploadedFiles = async (files: FileList) => {
    if (files.length > 0) {
      let order = imgList.current ? imgList.current.children.length + 1 : 1;

      const filesArray: ProductImage[] = [];
      for (let i = 0; i < files.length && i < MAX_UPLOAD_IMAGES; i++) {
        const path = await previewImage(files[i]);
        if (path) {
          filesArray.push({
            id: randomHash(),
            filename: path,
            file: files[i],
            order: order,
          });
          order++;
        }
      }

      dispatchImages({ type: "add", payload: filesArray });
    }
  };

  const handleRemoveImage = (image: ProductImage) => {
    dispatchImages({ type: "delete", payload: image });
  };

  const handleDeleteImage = (image: ProductImage) => {
    if (confirm("Are you sure you want to delete this image?")) {
      axiosInstance
        .delete(`${BACKEND_URL}/api/products/${image.productId}/image/${image.id}`)
        .then((response) => {
          if (response.status === 204) {
            handleRemoveImage(image);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const orderedImages = images.slice().sort((a, b) => a.order - b.order);

  return (
    <div className="d-flex flex-column">
      <h2>Images</h2>
      <div
        className={`dragable-area ${dragActive ? "drag-active" : ""}`}
        onDrop={(e) => handleDrop(e)}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
      >
        Drag images or click{" "}
        <span
          onClick={() => {
            if (inputFile.current) {
              inputFile.current.click();
            }
          }}
          style={{ fontWeight: "bold", cursor: "pointer" }}
        >
          {" "}
          here{" "}
        </span>{" "}
        to upload.
        <Form.Control
          type="file"
          accept="image/jpeg, image/png"
          hidden
          ref={inputFile}
          multiple
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
        />
      </div>
      <div className="manage-product-img-list" ref={imgList}>
        {orderedImages.length > 0 &&
          orderedImages.map((image, index) => {
            return (
              <div key={index} className="manage-product-img-item">
                <Form.Control
                  className="product-img-order"
                  type="text"
                  min={1}
                  max={MAX_UPLOAD_IMAGES}
                  value={index + 1}
                  onChange={(e) =>
                    dispatchImages({
                      type: "edit",
                      payload: { ...image, newOrder: parseInt(e.target.value) },
                    })
                  }
                />
                <img
                  className="manage-product-img"
                  src={
                    image.productId !== undefined
                      ? `${BACKEND_URL}/products/${image.productId}/${image.filename}`
                      : image.filename
                  }
                />
                <span>{image.productId !== undefined ? image.filename : image.file?.name.slice(0, 10) + "..."}</span>
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="remove-image"
                  size="xl"
                  onClick={() => {
                    if (image.productId !== undefined) {
                      handleDeleteImage(image);
                    } else {
                      handleRemoveImage(image);
                    }
                  }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductImageUpload;
