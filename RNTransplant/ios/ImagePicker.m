//
//  ImagePicker.m
//  RNTransplant
//
//  Created by kangxg on 2017/10/21.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "ImagePicker.h"
#import <React/RCTConvert.h>
#import <AssetsLibrary/AssetsLibrary.h>
#import <AVFoundation/AVFoundation.h>
#import <MobileCoreServices/MobileCoreServices.h>
#import <Photos/Photos.h>
@interface ImagePicker()
@property (nonatomic,retain)NSMutableDictionary * options;
@property (nonatomic,retain)NSMutableDictionary * response;
@property (nonatomic,strong) RCTResponseSenderBlock callback;
@property (nonatomic,retain)UIImagePickerController * picker;
@end

@implementation ImagePicker
RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(launchImagePicker:(NSDictionary *)options callback:(RCTResponseSenderBlock)callback{
  self.options = [NSMutableDictionary dictionaryWithDictionary:options];
  self.callback = callback;
  self.picker = [[UIImagePickerController alloc]init];
  self.picker.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
  self.picker.mediaTypes = @[(NSString *)kUTTypeImage];
  self.picker.modalPresentationStyle = UIModalPresentationCurrentContext;
  self.picker.delegate = self;
  
  [self checkPhotoPermissions:^(bool granted) {
    if (!granted) {
      self.callback(@[@{@"error":@"Photo library permissions not granted"}]);
      return ;
    }
    dispatch_async(dispatch_get_main_queue(), ^{
      UIViewController * root = [[[UIApplication sharedApplication].delegate window] rootViewController];
      while (root.presentedViewController != nil)
      {
        root = root.presentedViewController;
      }
      [root presentViewController:self.picker animated:YES completion:nil];
    });
  }];
  }
)
-(void)checkPhotoPermissions:(void (^)(bool granted))callback
{
  PHAuthorizationStatus status = [PHPhotoLibrary authorizationStatus];
  if (status == PHAuthorizationStatusAuthorized)
  {
    callback(YES);
    return;
  }
  else if (status == PHAuthorizationStatusNotDetermined)
  {
    [PHPhotoLibrary requestAuthorization:^(PHAuthorizationStatus status) {
      if (status == PHAuthorizationStatusAuthorized)
      {
        callback(YES);
        return ;
      }
      else
      {
        callback(NO);
        return;
      }
    }];
  }
  else
  {
     callback(NO);
  }
    
}

-(UIImage *)downscaleImageIfNecessary:(UIImage *)image maxWidth:(float)maxWidth maxHeight:(float)maxHeight
{
  UIImage * newImage = image;
  if (image.size.width<=maxWidth && image.size.height<=maxHeight) {
    return newImage;
  }
  CGSize scaleSize = CGSizeMake(image.size.width, image.size.height);
  if (maxWidth<scaleSize.width) {
    scaleSize = CGSizeMake(maxWidth, (maxWidth/scaleSize.width)*scaleSize.height);
  }
  if (maxHeight<scaleSize.height) {
    scaleSize = CGSizeMake((maxHeight/scaleSize.height)*scaleSize.width,maxHeight);
  }
  scaleSize.width = (int)scaleSize.width;
  scaleSize.height = (int)scaleSize.height;
  
  UIGraphicsBeginImageContext(scaleSize);
  [image drawInRect:CGRectMake(0, 0, scaleSize.width, scaleSize.height)];
  newImage = UIGraphicsGetImageFromCurrentImageContext();
  if (newImage == nil)
  {
    NSLog(@"could not scale image");
  }
  UIGraphicsEndImageContext();
  return newImage;
}

-(void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary<NSString *,id> *)info
{
  UIImage * image = [info objectForKey:UIImagePickerControllerOriginalImage];
  float maxWidth = image.size.width;
  float maxHeght = image.size.height;
  if ([self.options valueForKey:@"maxWidth"]) {
    maxWidth = [[self.options valueForKey:@"maxWidth"] floatValue];
  }
  if ([self.options valueForKey:@"maxHeight"]) {
    maxHeght = [[self.options valueForKey:@"maxHeight"] floatValue];
  }
  image = [self downscaleImageIfNecessary:image maxWidth:maxWidth maxHeight:maxHeght];
  NSString * fileName = nil;
  if ([[self.options objectForKey:@"imageFileType"] stringValue]){
    fileName = [[[NSUUID UUID]UUIDString]stringByAppendingString:@".png"];
  }else{
    fileName = [[[NSUUID UUID]UUIDString]stringByAppendingString:@".jpg"];
  }
  NSString * path = [[NSTemporaryDirectory() stringByStandardizingPath]stringByAppendingPathComponent:fileName];
  NSData * data = UIImageJPEGRepresentation(image, [[self.options valueForKey:@"quality"] floatValue]);
  [data writeToFile:path atomically:YES];
  self.response = [[NSMutableDictionary alloc]init];
  NSURL * fileurl = [NSURL fileURLWithPath:path];
  NSString * filePath = [fileurl absoluteString];
  [self.response setObject:filePath forKey:@"uri"];
  
  NSNumber * fileSizeValue = nil;
  NSError * fileSizeError = nil;
  [fileurl getResourceValue:&fileSizeValue forKey:NSURLFileSizeKey error:&fileSizeError];
  if (fileSizeValue) {
    [self.response setObject:fileSizeValue forKey:@"fileSize"];
  }
  self.callback(@[self.response]);
  [picker dismissViewControllerAnimated:YES completion:nil];
}

-(void)imagePickerControllerDidCancel:(UIImagePickerController *)picker
{
  self.callback(@[@{@"didCancel":@"YES"}]);
  [picker dismissViewControllerAnimated:YES completion:nil];
}
@end
