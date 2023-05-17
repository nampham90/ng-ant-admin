/* eslint-disable prettier/prettier */
import { TreeNodeInterface } from '@shared/components/tree-table/tree-table.component';

function convertTreeToList(root: TreeNodeInterface): TreeNodeInterface[] {
  const stack: TreeNodeInterface[] = [];
  const array: TreeNodeInterface[] = [];
  const hashMap = {};
  stack.push({ ...root, level: 0, expand: false, _checked: false });

  while (stack.length !== 0) {
    const node = stack.pop()!;
    visitNode(node, hashMap, array);
    if (node.children) {
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push({ ...node.children[i], level: node.level! + 1, _checked: false, expand: false, parent: node });
      }
    }
  }

  return array;
}

function visitNode(node: TreeNodeInterface, hashMap: { [key: string]: boolean }, array: TreeNodeInterface[]): void {
  if (!hashMap[node.id]) {
    hashMap[node.id] = true;
    array.push(node);
  }
}

// Lấy treeData dưới dạng map, đầu vào là danh sách dữ liệu (dataList)
const fnTreeDataToMap = function tableToTreeData(dataList: any[]): { [key: string]: TreeNodeInterface[] } {
  const mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = {};
  dataList.forEach(item => {
    mapOfExpandedData[item.id] = convertTreeToList(item);
  });
  return mapOfExpandedData;
};

/**
 * Phương thức này được sử dụng để chuyển đổi một mảng có quan hệ cha con thành một mảng có cấu trúc cây
 * Nhận một mảng có quan hệ cha con làm đầu vào
 * Trả về một mảng có cấu trúc cây 
 */
const fnFlatDataHasParentToTree = function translateDataToTree(data: any[], fatherId = 'fatherId'): any {
  // Dữ liệu không có nút cha
  let parents = data.filter(value => value[fatherId] === 0)
  .sort((a, b) => a.orderNum - b.orderNum);

  //Dữ liệu có nút cha
  let children = data.filter(value => value[fatherId] !== 0)
  .sort((a, b) => a.orderNum - b.orderNum);;

  let translator = (parents: any[], children: any[]): any => {
    parents.forEach(parent => {
      children.forEach((current, index) => {
        let p1 = parent._id;
        let p2 = parent.id;
        if(p1 != undefined){
          if (current[fatherId] === p1) {
            let temp = JSON.parse(JSON.stringify(children));
            temp.splice(index, 1);
            translator([current], temp);
            typeof parent.children !== 'undefined' ? parent.children.push(current) : (parent.children = [current]);
          }
        }else {
          if (current[fatherId] === p2) {
            let temp = JSON.parse(JSON.stringify(children));
            temp.splice(index, 1);
            translator([current], temp);
            typeof parent.children !== 'undefined' ? parent.children.push(current) : (parent.children = [current]);
          }
        }
      });
    });
  };
  //  Gọi phương thức chuyển đổi
  translator(parents, children);
  return parents;
};

// Thêm cấp độ và đánh dấu liệu có là nút gốc hay không vào dữ liệu cây, nút gốc có isLeaf là true, cấp độ được biểu thị bởi level
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const fnAddTreeDataGradeAndLeaf = function AddTreeDataGradeAndLeaf(array: any[], levelName = 'level', childrenName = 'children') {
  const recursive = (array: any[], level = 0): any => {
    level++;
    return array.map((v: any) => {
      v[levelName] = level;
      const child = v[childrenName];
      if (child && child.length > 0) {
        v.isLeaf = false;
        recursive(child, level);
      } else {
        v.isLeaf = true;
      }
      return v;
    });
  };
  return recursive(array);
};

// Dữ liệu cây được làm phẳng
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const fnFlattenTreeDataByDataList = function flattenTreeData(dataList: any[]) {
  const mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = fnTreeDataToMap(dataList);
  return fnGetFlattenTreeDataByMap(mapOfExpandedData);
};

// Lấy dữ liệu cây đã làm phẳng, đầu vào là treeData dưới dạng map"
const fnGetFlattenTreeDataByMap = function getFlattenTreeData(mapOfExpandedData: { [key: string]: TreeNodeInterface[] }): TreeNodeInterface[] {
  const targetArray: TreeNodeInterface[] = [];
  Object.values(mapOfExpandedData).forEach(item => {
    item.forEach(item_1 => {
      targetArray.push(item_1);
    });
  });
  return targetArray;
};

export { fnTreeDataToMap, fnAddTreeDataGradeAndLeaf, fnFlatDataHasParentToTree, fnFlattenTreeDataByDataList, fnGetFlattenTreeDataByMap };
