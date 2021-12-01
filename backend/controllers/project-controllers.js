const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Project = require("../models/project");
const User = require("../models/user");

// TESTAT
const getProjects = async (req, res, next) => {
  let projects;
  try {
    projects = await Project.find();
  } catch (err) {
    const error = new HttpError(
      "Fetching projects failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    projects: projects.map((project) => project.toObject({ getters: true })),
  });
};

// TESTAT
const getProjectById = async (req, res, next) => {
  const projectId = req.params.projectid;

  let project;
  try {
    project = await Project.findById(projectId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a project.",
      500
    );
    return next(error);
  }

  if (!project) {
    const error = new HttpError(
      "Could not find a project for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ project: project.toObject({ getters: true }) });
};

// TESTAT
const getProjectsByUserId = async (req, res, next) => {
  const userId = req.params.userid;

  let userWithProjects;
  try {
    userWithProjects = await User.findById(userId).populate("projects");
  } catch (err) {
    const error = new HttpError(
      "Fetching projects failed, please try again later",
      500
    );
    return next(error);
  }

  if (!userWithProjects || userWithProjects.projects.length === 0) {
    return next(
      new HttpError("Could not find projects for the provided user id.", 404)
    );
  }

  res.json({
    projects: userWithProjects.projects.map((project) =>
      project.toObject({ getters: true })
    ),
  });
};

// TESTAT
const createProject = async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return next(
  //     new HttpError("Invalid inputs passed, please check your data.", 422)
  //   );
  // }

  const { name, repo, users } = req.body;

  const createdProject = new Project({
    name,
    repo,
    users,
    bugs: [],
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdProject.save({ session: sess });
    let newUser;
    for (let user of users) {
      newUser = await User.findById(user);
      console.log(newUser);
      await newUser.projects.push(createdProject);
      await newUser.save({ session: sess });
    }
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Creating project failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ project: createdProject });
};

exports.getProjects = getProjects;
exports.getProjectById = getProjectById;
exports.getProjectsByUserId = getProjectsByUserId;
exports.createProject = createProject;
