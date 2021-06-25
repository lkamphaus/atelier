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

module.exports = {
  groupFeaturesByProductId
}