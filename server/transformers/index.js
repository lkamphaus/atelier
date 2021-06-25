const groupFeaturesByProductId = (data) => {
  let features = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].feature && data[i].value) {
      features.push({
        feature: data[i].feature,
        value: data[i].value
      })
    }
  }

  let transformed = data[0];
  transformed.features = features;
  delete transformed.feature;
  delete transformed.value;

  return transformed;
}

const groupStylesByProductId = (data) => {
  let photos = [];
  let skus = {};

  for (let i = 0; i < data.length; i++) {
    if (data[i].thumbnail_url && data[i].url) {
      photos.push({
        thumbnail_url: data[i].thumbnail_url,
        url: data[i].url
      })
    }

    if (data[i].size && data[i].quantity) {
      skus[data[i].id] = {
        size: data[i].size,
        quantity: data[i].quantity
      }
    }
  }

  let transformed = {
    product_id: data[0]["product_id"],
    results: data[0]
  }


  transformed.results.photos = photos;
  transformed.results.skus = skus;

  delete transformed.results.thumbnail_url;
  delete transformed.results.url;
  delete transformed.results.quantity;
  delete transformed.results.size;



  return transformed;
}

const groupRelatedProductsByProductId = (data) => {
  let related = []

  for (let i = 0; i < data.length; i++) {
    if (data[i].related_id) {
      related.push(data[i].related_id);
    }
  }

  return related;
}

module.exports = {
  groupFeaturesByProductId,
  groupStylesByProductId,
  groupRelatedProductsByProductId
}