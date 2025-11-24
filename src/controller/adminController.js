import District from '../models/District.js';
import Province from '../models/Province.js';
import Manifest from '../models/Manifest.js';
import User from '../models/User.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';



export const createProvince = async (req, res) => {
  try {
    const { province } = req.body;

    
    if (!province) {
      return res.status(400).json({ message: 'Province is required' });
    }

    
    const existingProvince = await Province.findOne({ name: province });
    if (existingProvince) {
      return res.status(400).json({ message: 'Province already exists' });
    }

    
    const newProvince = await Province.create({ name: province });

    res.status(201).json({
      success: true,
      message: 'Province created successfully',
      province: newProvince
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createDistrict = async (req, res) => {
    try{
        const {district} = req.body;
    if(!district){
        return res.status(400).json({message: 'District is required'});
    }
    const existingDistrict = await District.findOne({district});
    if(existingDistrict){
        return res.status(400).json({message: 'District already exists'});
    }
    const newDistrict = await District.create({district});
    res.status(201).json({
        success: true,
        message: 'District created successfully',
        district: newDistrict
    });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const createManifest = async (req, res) => {
  try {
    const {
      candidateName,
      candidateParty,
      discraption,
      electionDate,
      province,
      district
    } = req.body;


    if (!candidateName || !candidateParty || !discraption || !electionDate || !province || !district || !req.file) {
      return res.status(400).json({ message: 'All fields are required including PDF file' });
    }

    const buffer = req.file.buffer;

    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto', folder: 'manifests' },
      async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ success: false, message: 'Upload failed', error });
        }

        try {
          const manifest = await Manifest.create({
            candidateName,
            candidateParty,
            discraption,
            pdfUrl: result.secure_url,
            cloudinaryId: result.public_id,
            electionDate,
            province,
            district
          });

          res.status(201).json({ success: true, manifest });
        } catch (err) {
          console.error(err);
          res.status(500).json({ success: false, message: 'Server error' });
        }
      }
    );

    
    streamifier.createReadStream(buffer).pipe(uploadStream);

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getProvinces = async (req,res) =>{
    try{
    const provinces = await Province.find();
    res.status(200).json({
        success:true,
        provinces
    });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const getDistricts = async (req,res) =>{
    try{
    const districts = await District.find();
    res.status(200).json({
        success:true,
        districts
    });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const getManifests = async (req,res) =>{
    try{
    const manifests = await Manifest.find()
    .populate('province', 'name')
    .populate('district', 'district');
    res.status(200).json({
        success:true,
        manifests
    });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const deleteManifest = async (req,res) =>{
    try{
    const {id} = req.params;
    const manifest = await Manifest.findById(id);
    if(!manifest){
        return res.status(404).json({message: 'Manifest not found'});
    }
    await cloudinary.uploader.destroy(manifest.cloudinaryId, {resource_type: 'auto'});
    await manifest.remove();
    res.status(200).json({
        success:true,
        message: 'Manifest deleted successfully'
    });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const deleteProvince = async (req,res) =>{
    try{
    const {id} = req.params;
    const province = await Province.findById(id);
    if(!province){
        return res.status(404).json({message: 'Province not found'});
    }
    await province.remove();
    res.status(200).json({
        success:true,
        message: 'Province deleted successfully'
    });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const deleteDistrict = async (req,res) =>{
    try{
    const {id} = req.params;
    const district = await District.findById(id);
    if(!district){
        return res.status(404).json({message: 'District not found'});
    }
    await district.remove();
    res.status(200).json({
        success:true,
        message: 'District deleted successfully'
    });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const editManifest = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        candidateName,
        candidateParty,
        discraption,
        electionDate,
        province,
        district
      } = req.body;
  
      const manifest = await Manifest.findById(id);
      if (!manifest) {
        return res.status(404).json({ message: 'Manifest not found' });
      }
  
      manifest.candidateName = candidateName || manifest.candidateName;
      manifest.candidateParty = candidateParty || manifest.candidateParty;
      manifest.discraption = discraption || manifest.discraption;
      manifest.electionDate = electionDate || manifest.electionDate;
      manifest.province = province || manifest.province;
      manifest.district = district || manifest.district;
  
      await manifest.save();
  
      res.status(200).json({ success: true, manifest });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }