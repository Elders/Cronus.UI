const ANNOTATIONS = '__annotations__';
interface Type<T> extends Function { new (...args: any[]): T; }
function isType(v: any): v is Type<any> {
  return typeof v === 'function';
}

function annotations(typeOrFunc: Type<any>): any[] {
  if (!isType(typeOrFunc)) {
    return [];
  }
  const parentCtor = getParentCtor(typeOrFunc);
  const ownAnnotations = _ownAnnotations(typeOrFunc, parentCtor) || [];
  const parentAnnotations = parentCtor !== Object ? annotations(parentCtor) : [];
  return parentAnnotations.concat(ownAnnotations);
}
function _ownAnnotations(typeOrFunc: Type<any>, parentCtor: any): any[]|null {
  // Prefer the direct API.
  if ((<any>typeOrFunc).annotations && (<any>typeOrFunc).annotations !== parentCtor.annotations) {
    let annotations = (<any>typeOrFunc).annotations;
    if (typeof annotations === 'function' && annotations.annotations) {
      annotations = annotations.annotations;
    }
    return annotations;
  }

  // API of tsickle for lowering decorators to properties on the class.
  if ((<any>typeOrFunc).decorators && (<any>typeOrFunc).decorators !== parentCtor.decorators) {
    return convertTsickleDecoratorIntoMetadata((<any>typeOrFunc).decorators);
  }

  // API for metadata created by invoking the decorators.
  if (typeOrFunc.hasOwnProperty(ANNOTATIONS)) {
    return (typeOrFunc as any)[ANNOTATIONS];
  }
  return null;
}
function getParentCtor(ctor: Function): Type<any> {
  const parentProto = ctor.prototype ? Object.getPrototypeOf(ctor.prototype) : null;
  const parentCtor = parentProto ? parentProto.constructor : null;
  // Note: We always use `Object` as the null value
  // to simplify checking later on.
  return parentCtor || Object;
}
function convertTsickleDecoratorIntoMetadata(decoratorInvocations: any[]): any[] {
  if (!decoratorInvocations) {
    return [];
  }
  return decoratorInvocations.map(decoratorInvocation => {
    const decoratorType = decoratorInvocation.type;
    const annotationCls = decoratorType.annotationCls;
    const annotationArgs = decoratorInvocation.args ? decoratorInvocation.args : [];
    return new annotationCls(...annotationArgs);
  });
}

 
var Reflection={
  getAnnotation: annotations
}
export { Reflection };
