import React, { useRef, useState } from "react";
import { ImageReducerAction, PackageImage } from "../../../types";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { previewImage, randomHash } from "../../../utils";
import { BACKEND_URL, THUMBNAIL_PREFIX } from "../../../config";
import { MAX_PACKAGE_IMAGES } from "../hooks/useManagePackage";
import { useDeletePackageImage } from "../../../api/packages/deletePackageImage";

type ManagePackageImageProps = {
  images: PackageImage[];
  dispatchImages: React.Dispatch<ImageReducerAction<PackageImage>>;
};

const PackageImageUpload = ({ images, dispatchImages }: ManagePackageImageProps) => {
  const [dragActive, setDragActive] = useState(false);
  const inputFile = useRef<HTMLInputElement>(null);
  const imgList = useRef<HTMLDivElement>(null);
  const deletePackageImage = useDeletePackageImage();

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

    if (e.dataTransfer.files?.[0]) {
      handleUploadedFiles(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files?.[0]) {
      handleUploadedFiles(e.target.files);
    }
  };

  const handleUploadedFiles = async (files: FileList) => {
    if (files.length > 0) {
      let order = imgList.current ? imgList.current.children.length + 1 : 1;

      const filesArray: PackageImage[] = [];
      for (let i = 0; i < files.length && i < MAX_PACKAGE_IMAGES; i++) {
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

  const handleRemoveImage = (image: PackageImage) => {
    dispatchImages({ type: "delete", payload: image });
  };

  const handleDeleteImage = (image: PackageImage) => {
    if (image.packageId === undefined) {
      console.error("Missing product id.");
      return false;
    }

    if (!confirm("Are you sure you want to delete this image?")) {
      return false;
    }

    const data = {
      imageId: image.id.toString(),
      packageId: image.packageId.toString(),
    };

    deletePackageImage.mutate(data, {
      onSuccess: (response) => {
        if (response.status === 204) {
          handleRemoveImage(image);
        }
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const orderedImages = images.slice().sort((a, b) => a.order - b.order);

  return (
    <div className="d-flex flex-column">
      <h2 className="text-center">Images</h2>
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
      <div className="manage-package-img-list" ref={imgList}>
        {orderedImages.length > 0 &&
          orderedImages.map((image, index) => {
            return (
              <div key={index} className="manage-package-img-item">
                <Form.Control
                  className="package-img-order"
                  type="text"
                  min={1}
                  max={MAX_PACKAGE_IMAGES}
                  value={index + 1}
                  onChange={(e) =>
                    dispatchImages({
                      type: "edit",
                      payload: { ...image, newOrder: parseInt(e.target.value) },
                    })
                  }
                />
                <img
                  className="manage-package-img"
                  src={
                    image.packageId !== undefined
                      ? `${BACKEND_URL}/packages/${image.packageId}/${THUMBNAIL_PREFIX}${image.filename}`
                      : image.filename
                  }
                />
                <span>{image.packageId !== undefined ? image.filename : image.file?.name.slice(0, 10) + "..."}</span>
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="remove-image"
                  size="xl"
                  onClick={() => {
                    if (image.packageId !== undefined) {
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

export default PackageImageUpload;
