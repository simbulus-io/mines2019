#!/usr/bin/env ruby
def install_missing(&block)
  yield
rescue LoadError => e
  gem_name = e.message.split('--').last.strip
  install_command = 'gem install ' + gem_name

  # install missing gem
  puts 'Probably missing gem: ' + gem_name
  print 'Auto installing'
  system(install_command) or exit(1)

  # retry
  Gem.clear_paths
  puts 'Trying again ...'
  require gem_name
  retry
end

install_missing do
  require "thor"
  require "json"
  require "crack"
  require "securerandom"
  require "terminal-table"
  require "colorize"
  require "os"
end

class CLI < Thor

  ROOTDIR = File.expand_path(File.join('../', File.dirname(__FILE__)))

  desc "killall", "Kill all containers (docker)"
  def killall
    killall = "docker kill $(docker ps -q)"
    run_cmd(killall)
  end

  desc "bash", "List all running docker containers (docker)"
  method_option :name, :aliases=>"n",  :desc => "container name", :type=>:string, :required=>true
  def bash
    cmd = "docker exec -it #{options[:name]} /bin/bash"
    command_runner(cmd:cmd)
  end

  desc "ls", "List all running docker containers (docker)"
  def ls
    cmd = "docker container ls"
    command_runner(cmd:cmd)
  end

  desc "rm", "Remove stopped containers (docker-compose)"
  def rm
    cmd = "docker-compose rm"
    command_runner(cmd:cmd)
  end

  desc "status", "Returns true if named ocker container is running (docker)"
  method_option :name, :desc => "container name", :type=>:string, :required=>true
  def status
    cmd = "docker inspect -f '{{.State.Running}}' #{options[:name]}"
    `#{cmd}`
    status = $?.exitstatus==0
    info("Container: #{options[:name]}, Running: #{status}")
  end

  desc "up", "Up (docker-compose)"
  def up
    cmd = "docker-compose up"
    command_runner(cmd:cmd)
  end

  desc "mongo", "Mongo shell"
  def mongo
    `docker inspect -f '{{.State.Running}}' docker_mongodb_1`
    status = $?.exitstatus==0
    if(status)
      cmd = "mongo -host localhost:27017"
      command_runner(cmd:cmd)
    else
      error("The container docker_mongodb_1 doesn't appear to be running")
    end
  end

  private

  # update branch and run docker command
  def command_runner cmd:, repo:nil, branch:nil
    status = run_cmd(cmd)
    status
  end

  # echo and run ToDo: error handling
  def run_cmd cmd
    info cmd
    status = system(cmd)
    if status
      info("Woot! Woot! - command succeeded #{cmd}")
    else
      error("Gahhhh! Bad status from #{cmd}")
    end
    status
  end

  def error msg
    puts msg.to_s.colorize(:red)
  end

  def info msg
    puts msg.to_s.colorize(:yellow)
  end

end

CLI.start

