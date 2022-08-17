// calculate a value to represented the distance between these two points, using pythagoras theorem
const calculateDistance = (point, target) => {
    return Math.sqrt(Math.pow(point[0] - target[0], 2) + Math.pow(point[1] - target[1], 2));
}

const swap = (d, i, j) => {
    var tmp = d[i];
    d[i] = d[j];
    d[j] = tmp;
}

const minHeapify = (d, i, length) => {
    while (true) {
        let left = i * 2 + 1;
        let right = i * 2 + 2;
        let parent = i;
        let largest = i;

        if (left < length && d[left].distance < d[parent].distance) {
            largest = left;
        }

        if (right < length && d[right].distance < d[parent].distance) {
            largest = right;
        }

        if (largest === i) {
            break
        }

        swap(d, i, largest);
        i = largest;
    }
}

const heapify = (d, length) => {
    for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
        minHeapify(d, i, length);
    }
}

// function to sort data using Heap Sort
const heapSort = (d) => {
    return new Promise((resolve, reject) => {
        heapify(d, d.length);

        for (let i = d.length - 1; i > 0; i--) {
            minHeapify(d, 0, i);
        }
        resolve(d);
    })
}

// function to find k closest points
const findKClosestPoints = (target, pts, k) => {
    let disArr = [];
    for (let i = 0; i < pts.length; i++) {
        disArr.push({
            points: pts[i],
            distance: calculateDistance(pts[i], target)
        });
    }
    heapSort(disArr)
        .then((res) => {
            console.log(`There are ${k} closest points to point [${target}]: `);
            for (let i = 0; i < k; i++) {
                console.log(res[i].points);
            }
        });
}

let points = [[0.1, 0.4], [0, 0.2], [0.1, 0], [0.3, 0.5], [0.2, 0.3], [0.3, 0.8]];
let target = [0.3, 0.5]

findKClosestPoints(target, points, 3);