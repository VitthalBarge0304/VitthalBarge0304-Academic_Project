const express = require('express')
const Job = require('../models/jobModel')
const getJobsList = async (req,res)=>{
    try{
        const {limit,page} = req.query;
        const currentPage = parseInt(page) || 1;
        const limitNumber = parseInt(limit);
        const jobs = await Job.find({})
        .skip((currentPage-1)*limitNumber)
        .limit(limitNumber).sort({createdAt:-1});
        const totalJobs = await Job.countDocuments();
        
       return res.status(200).json({jobs,totalJobs,
        totalPages:Math.ceil(totalJobs/limitNumber),
        currentPage
       })
    }catch(err){
        res.status(500).json({ message: 'Error fetching jobs list', error: err.message });
    }
   
}

module.exports = {getJobsList}
